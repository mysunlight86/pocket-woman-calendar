import React from 'react';
import {
  View,
  StyleSheet,
  ViewPropTypes
} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  cell: {
    borderColor: 'gray',
    position: 'absolute'
  }
});

function grid({
  width,
  height,
  rows,
  columns,
  innerBorder,
  outerBorder,
  padding,
}) {
  // index - > row / column dictionary

  const rowidx = [];
  const colidx = [];
  const total = rows * columns;
  for (let i = 0, r = 0, c = 0; i < total; i++) {
    if (c === columns) {
      c = 0;
      r++;
    }
    rowidx[i] = r;
    colidx[i] = c;
    c++;
  }
  const getRow = index => rowidx[index];
  const getColumn = index => colidx[index];

  // Compute styles for items

  const getBorder = (row, column) => ({
    borderTopWidth: row === 0 ? outerBorder : 0,
    borderRightWidth: column === columns - 1 ? outerBorder : innerBorder,
    borderBottomWidth: row === rows - 1 ? outerBorder : innerBorder,
    borderLeftWidth: column === 0 ? outerBorder : 0
  });

  const itemWidth = Math.floor(width / columns);
  const itemHeight = Math.floor(height / rows);

  const getPosition = (row, column) => ({
    left: column * itemWidth,
    top: row * itemHeight
  });

  const getStyle = (row, column) => ({
    ...styles.cell,
    ...getBorder(row, column),
    ...getPosition(row, column),
    padding,
    width: itemWidth,
    height: itemHeight,
    // innerWidth: itemWidth - padding * 2,
    // innerHeight: itemHeight - padding * 2,
  });

  return index => {
    const row = getRow(index);
    const column = getColumn(index);
    return {
      width: itemWidth,
      height: itemHeight,
      row,
      column,
      style: row !== undefined && column !== undefined
        ? getStyle(row, column)
        : {}
    };
  };
}

export default function GridLayout({
  style,
  rows,
  columns,
  innerBorder,
  outerBorder,
  padding,
  children
}) {
  if (!children || !children.length) {
    return null;
  }
  const { width = 0, height = 0 } = StyleSheet.flatten(style);
  if (width <= 0 || height <= 0) {
    return null;
  }
  if (rows <= 0 || columns <= 0) {
    return null;
  }
  const gridProps = grid({
    width,
    height,
    rows,
    columns,
    innerBorder,
    outerBorder,
    padding,
  });
  return (
    <View style={[style, { width, height }]}>
      {
        Array.from(children).map((child, index) => child(gridProps(index)))
      }
    </View>
  );
}

GridLayout.propTypes = {
  rows: PropTypes.number.isRequired,
  columns: PropTypes.number.isRequired,
  innerBorder: PropTypes.number,
  outerBorder: PropTypes.number,
  padding: PropTypes.number,
  children: PropTypes.arrayOf(PropTypes.func).isRequired,
  style: ViewPropTypes.style
};

GridLayout.defaultProps = {
  innerBorder: 0,
  outerBorder: 0,
  padding: 0,
  style: {},
};
