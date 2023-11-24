import { formatTransformAndScale } from './format-animaton';

const params = {
  translateX: '1',
  translateY: '1',
  scale: null,
  scaleX: '1',
  scaleY: '1',
};

describe('formatTransformAndScale util', () => {
  it('should convert translate and scale values to single string', () => {
    const { translate, scale } = formatTransformAndScale(
      params.translateX,
      params.translateY,
      params.scale,
      params.scaleX,
      params.scaleY,
    );

    expect(translate).to.equal('1px 1px');
    expect(scale).to.equal('1 1');
  });

  it('should return null for scale', () => {
    const { translate, scale } = formatTransformAndScale(
      params.translateX,
      params.translateY,
      '1',
      params.scaleX,
      params.scaleY,
    );

    expect(translate).to.equal('1px 1px');
    expect(scale).to.equal(null);
  });

  it('should return null for scale and translate', () => {
    const { translate, scale } = formatTransformAndScale(null, null, null, null, null);

    expect(translate).to.equal(null);
    expect(scale).to.equal(null);
  });
});
