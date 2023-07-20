export class UtilityComponent {
  /**
   * event.body parsing 하여 반환
   * @param {string | null} eventBody - event.body
   * @returns {object}
   */
  static eventBodyParser(eventBody: string | null): object {
    if (eventBody === null) {
      return {};
    }
    try {
      return JSON.parse(eventBody);
    } catch (error) {
      throw new Error('잘못된 형식의 요청 본문 값 입니다.');
    }
  }
}
