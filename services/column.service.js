const ColumnRepository = require('../repositories/column.repository.js');
const MakeError = require('../utils/makeErrorUtil.js');

class ColumnService {
  columnRepository = new ColumnRepository();

  // 컬럼 추가
  createColumn = async (boardId, name, position) => {
    if (isNaN(boardId) || boardId < 1) {
      throw new MakeError(400, '잘못된 boardId입니다.');
    }

    if (!name) {
      throw new MakeError(400, '컬럼 이름을 입력해주세요.');
    }

    if (!position) {
      throw new MakeError(400, '컬럼 위치를 입력해주세요.');
    }

    const findBoardData = await this.columnRepository.findOneBoardDataByBoardId(
      boardId,
    );
    if (!findBoardData) {
      throw new MakeError(400, '존재하지 않는 보드입니다.');
    }

    await this.columnRepository.createColumn(boardId, name, position);
    return true;
  };

  // 컬럼 조회
  getAllColumns = async (boardId) => {
    const findBoardData = await this.columnRepository.findOneBoardDataByBoardId(
      boardId,
    );

    if (!findBoardData) {
      throw new MakeError(400, '존재하지 않는 보드입니다.');
    }

    return await this.columnRepository.getAllColumns(boardId);
  };

  // 컬럼 수정(name)
  modifyNameOfColumn = async (boardId, columnId, name) => {
    if (!name) {
      throw new MakeError(400, '수정할 컬럼 이름을 입력해주세요.');
    }

    const findBoardData = await this.columnRepository.findOneBoardDataByBoardId(
      boardId,
    );
    if (!findBoardData) {
      throw new MakeError(400, '존재하지 않는 보드입니다.');
    }

    const findColumnData =
      await this.columnRepository.findOneColumnDataByColumnId(columnId);
    if (!findColumnData) {
      throw new MakeError(400, '존재하지 않는 컬럼입니다.');
    }

    await this.columnRepository.modifyNameOfColumn(columnId, name);
    return true;
  };

  // 컬럼 삭제
  deleteColumn = async (boardId, columnId) => {
    const findBoardData = await this.columnRepository.findOneBoardDataByBoardId(
      boardId,
    );
    if (!findBoardData) {
      throw new MakeError(400, '존재하지 않는 보드입니다.');
    }

    const findColumnData =
      await this.columnRepository.findOneColumnDataByColumnId(columnId);
    if (!findColumnData) {
      throw new MakeError(400, '존재하지 않는 컬럼입니다.');
    }

    await this.columnRepository.deleteColumn(columnId);
    return;
  };
}

module.exports = ColumnService;
