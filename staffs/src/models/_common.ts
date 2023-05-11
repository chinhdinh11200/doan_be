import { DataTypes, literal } from 'sequelize';

export const commonFields = () => ({
  createdAt: {
    allowNull: true,
    type: DataTypes.DATE,
    field: 'createdAt',
    defaultValue: literal('CURRENT_TIMESTAMP')
  },
  updatedAt: {
    allowNull: true,
    type: DataTypes.DATE,
    field: 'updatedAt',
    defaultValue: literal('CURRENT_TIMESTAMP')
  },
  deletedAt: {
    type: DataTypes.DATE,
    field: 'deletedAt',
    defaultValue: null
  }
});
