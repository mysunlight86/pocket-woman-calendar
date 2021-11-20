import { Text } from 'react-native';
import React from 'react';

// Note: test renderer must be required after react-native.
import Renderer from 'react-test-renderer';

describe('TestComponent', () => {
  function TestComponent() {
    return <Text>Hello World!</Text>;
  }

  it('should show Hello World', () => {
    const renderer = Renderer.create(<TestComponent />);
    expect(renderer.toJSON().children[0]).toBe('Hello World!');
  });

  it('should render Text component with Hello World', () => {
    const renderer = Renderer.create(<TestComponent />);
    expect(renderer.root.findByType(Text).children[0].children[0]).toBe(
      'Hello World!'
    );
  });
});
