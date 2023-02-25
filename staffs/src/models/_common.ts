import { DataTypes, literal } from 'sequelize';

export const commonFields = () => ({
  createdAt: {
    allowNull: true,
    type: DataTypes.DATE,
    defaultValue: literal('CURRENT_TIMESTAMP')
  },
  updatedAt: {
    allowNull: true,
    type: DataTypes.DATE,
    defaultValue: literal('CURRENT_TIMESTAMP')
  },
  deletedAt: {
    type: DataTypes.DATE,
    defaultValue: null
  }
});
