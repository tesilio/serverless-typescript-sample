import { expect } from 'chai';
import { createSandbox, SinonSandbox } from 'sinon';
import { UtilityComponent } from '../utility.component';

describe('UtilityComponent 테스트', () => {
  let sandbox: SinonSandbox;

  beforeEach(() => {
    sandbox = createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('eventBodyParser 테스트', () => {
    it('JSON 입력 시, 객체가 반환된다.', () => {
      const expectedResult = {
        a: 1,
      };
      const input = JSON.stringify(expectedResult);

      const result = UtilityComponent.eventBodyParser(input);

      expect(result).deep.equal(expectedResult);
    });

    it('null 입력 시, 빈 객체가 반환된다.', () => {
      const expectedResult = {};
      const input = null;

      const result = UtilityComponent.eventBodyParser(input);

      expect(result).deep.equal(expectedResult);
    });

    it('잘못된 JSON 입력 시, Error 가 발생한다.', () => {
      const input = '{28934}';

      expect(() => UtilityComponent.eventBodyParser(input)).to.throw(
        '잘못된 형식의 요청 본문 값 입니다.',
      );
    });
  });
});
