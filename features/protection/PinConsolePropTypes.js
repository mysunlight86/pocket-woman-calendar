export default {
  pinLength(props, propName, componentName) {
    const { [propName]: propValue } = props;
    if (typeof propValue !== 'number') {
      return new Error(`Prop ${propName} supplied to ${componentName} should be a number.`);
    }
    if (!Number.isFinite(propValue)) {
      return new Error(`Prop ${propName} supplied to ${componentName} should finite.`);
    }
    if (propValue <= 0) {
      return new Error(`Prop ${propName} supplied to ${componentName} should be positive.`);
    }
    return null;
  }
};
