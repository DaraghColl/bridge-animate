interface FormatTransformAndScalereturn {
  translate: string | null;
  scale: string | null;
}

const formatTransformAndScale = (
  translateX: string | undefined | null,
  translateY: string | undefined | null,
  scale: string | undefined | null,
  scaleX: string | undefined | null,
  scaleY: string | undefined | null,
): FormatTransformAndScalereturn => {
  const translateProperties: string[] = [];
  const scaleProperties: string[] = [];

  if (translateX && translateX !== '') {
    translateProperties.push(`${translateX.toString()}px`);
  }
  if (translateY && translateY !== '') {
    if (!translateX || translateX === '') {
      translateProperties.push('0px');
    }
    translateProperties.push(`${translateY.toString()}px`);
  }

  if (!scale || scale === '' || scale === undefined) {
    if (scaleX && scaleX !== '') {
      scaleProperties.push(scaleX.toString());

      if (!scaleY || scaleX === '') {
        scaleProperties.push('1');
      }
    }
    if (scaleY && scaleY !== '') {
      if (!scaleX || scaleX === '') {
        scaleProperties.push('1');
      }
      scaleProperties.push(`${scaleY.toString()}`);
    }
  }

  return {
    translate: translateProperties.length > 0 ? translateProperties.join(' ') : null,
    scale: scaleProperties.length > 0 ? scaleProperties.join(' ') : null,
  };
};

export { formatTransformAndScale };
