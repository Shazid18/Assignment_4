

import { Request, Response } from 'express';
import fs from 'fs/promises';
import path from 'path';
import { HotelController } from '../src/controllers/hotelController';

// Mock fs/promises
jest.mock('fs/promises');

describe('HotelController', () => {
  let hotelController: HotelController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    hotelController = new HotelController();
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  describe('createHotel', () => {
    beforeEach(() => {
      mockRequest = {
        body: {
          title: 'Test Hotel',
          rooms: [
            { roomTitle: 'Deluxe Room', price: 100 }
          ],
          images: []
        }
      };
    });

    it('should create a hotel successfully', async () => {
      // Mock fs functions
      (fs.mkdir as jest.Mock).mockResolvedValue(undefined);
      (fs.writeFile as jest.Mock).mockResolvedValue(undefined);

      await hotelController.createHotel(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Test Hotel',
          slug: 'test-hotel',
          rooms: expect.arrayContaining([
            expect.objectContaining({
              roomTitle: 'Deluxe Room',
              roomSlug: 'deluxe-room',
              hotelSlug: 'test-hotel'
            })
          ])
        })
      );
    });

    it('should handle errors during hotel creation', async () => {
      (fs.mkdir as jest.Mock).mockRejectedValue(new Error('Failed to create directory'));

      await hotelController.createHotel(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: 'Failed to create hotel'
      });
    });
  });

  describe('getHotel', () => {
    const mockHotelData = {
      id: '123',
      title: 'Test Hotel',
      slug: 'test-hotel',
      rooms: []
    };

    beforeEach(() => {
      mockRequest = {
        params: { hotelId: '123' }
      };
    });

    it('should get a hotel successfully', async () => {
      (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockHotelData));

      await hotelController.getHotel(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.json).toHaveBeenCalledWith(mockHotelData);
    });

    it('should handle non-existent hotel', async () => {
      (fs.readFile as jest.Mock).mockRejectedValue(new Error('File not found'));

      await hotelController.getHotel(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: 'Hotel not found'
      });
    });
  });

  describe('updateHotel', () => {
    const existingHotel = {
      id: '123',
      title: 'Old Hotel',
      slug: 'old-hotel',
      rooms: [
        { roomTitle: 'Old Room', roomSlug: 'old-room', hotelSlug: 'old-hotel' }
      ]
    };

    beforeEach(() => {
      mockRequest = {
        params: { hotelId: '123' },
        body: {
          title: 'Updated Hotel',
          rooms: [
            { roomTitle: 'New Room', price: 150 }
          ]
        }
      };
    });

    it('should update a hotel successfully', async () => {
      (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(existingHotel));
      (fs.writeFile as jest.Mock).mockResolvedValue(undefined);

      await hotelController.updateHotel(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Updated Hotel',
          slug: 'updated-hotel',
          rooms: expect.arrayContaining([
            expect.objectContaining({
              roomTitle: 'New Room',
              roomSlug: 'new-room',
              hotelSlug: 'updated-hotel'
            })
          ])
        })
      );
    });
  });

  describe('uploadImages', () => {
    const mockFiles = [
      {
        originalname: 'test.jpg',
        filename: 'images-123456.jpg',
        path: 'uploads/images/images-123456.jpg'
      }
    ];

    beforeEach(() => {
      mockRequest = {
        files: mockFiles as Express.Multer.File[],
        body: { hotelId: '123' }
      };
    });

    it('should upload images successfully', async () => {
      const mockHotelData = {
        id: '123',
        images: []
      };

      (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockHotelData));
      (fs.writeFile as jest.Mock).mockResolvedValue(undefined);

      await hotelController.uploadImages(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.json).toHaveBeenCalledWith({
        imageUrls: expect.arrayContaining([
          expect.stringMatching(/^\/uploads\/images\/.*\.jpg$/)
        ])
      });
    });

    it('should handle invalid file formats', async () => {
      mockRequest.files = [{
        originalname: 'test.exe',
        filename: 'images-123456.exe',
        path: 'uploads/images/images-123456.exe'
      }] as Express.Multer.File[];

      (fs.unlink as jest.Mock).mockResolvedValue(undefined);

      await hotelController.uploadImages(
        mockRequest as Request,
        mockResponse as Response
      );
    });
  });
});