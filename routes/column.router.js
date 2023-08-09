const express = require('express');
const router = express.Router();

const ColumnController = require('../controllers/column.controller.js');
const columnController = new ColumnController();

// 컬럼 추가
router.post('/:boardId/column', columnController.createColumn);

// 컬럼 조회
router.get('/:boardId/column', columnController.getAllColumns);

// 컬럼 수정(name)
router.put(
  '/:boardId/column/:columnId/name',
  columnController.modifyNameOfColumn,
);

// 컬럼 수정(postion)
router.put(
  '/:boardId/column/:columnId/position',
  columnController.modifyPositionOfColumn,
);

// 컬럼 삭제
router.delete('/:boardId/column/:columnId', columnController.deleteColumn);

module.exports = router;