import { Request, Response } from 'express';
import * as core from '@app/core';

export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const userQuerier = core.getModules().queries.userQuerier;
    const data = await userQuerier.getAll();

    res.status(200).json({
      message: 'Users fetched successfully',
      data,
    });
  } catch (error) {
    console.error('Error fetching users:', error);

    res.status(500).json({
      message: 'Internal server error',
      data: null,
    });
  }
};

export const deleteById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userHandler = core.getModules().handlers.userHandler;
    
    const deletedUser = await userHandler.deleteById(id);

    if (!deletedUser) {
      res.status(404).json({
        message: `User with id ${id} not found`,
        data: null,
      });
    } else {
      res.status(200).json({
        message: 'User deleted successfully',
        data: deletedUser,
      });
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({
      message: 'Internal server error',
      data: null,
    });
  }
};