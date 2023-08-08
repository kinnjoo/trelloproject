const ColumnService = require('../services/column.service.js');
const MakeError = require('../utils/makeErrorUtil.js');

class ColumnController {
  columnService = new ColumnService();

  // 컬럼 추가
  createColumn = async (req, res) => {
    try {
      const { boardId } = req.params;
      const { name, position } = req.body;

      await this.columnService.createColumn(boardId, name, position);
      return res.status(201).json({ message: '컬럼을 추가하였습니다.' });
    } catch (err) {
      if (err instanceof MakeError) {
        return res.status(err.code).json({ message: err.message });
      }
      console.log(err);
      return res.status(500).json({ message: 'Server Error' });
    }
  };
}

module.exports = ColumnController;
