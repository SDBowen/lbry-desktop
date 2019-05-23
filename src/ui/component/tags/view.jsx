import React, { useEffect, useState, useContext, createContext, useRef } from 'react';
import classnames from 'classnames';
import { animated, useTransition } from 'react-spring';
import Button from 'component/button';

export function Tag(props) {
  const { name, isSelected, newTag, onClick } = props;

  return (
    <Button
      key={name}
      className={classnames('tag', {
        'tag--selected': isSelected,
      })}
      onClick={onClick}
      key={name}
    >
      {name}
      <span className="tag__action-label">{isSelected ? <span>&times;</span> : '+'}</span>
    </Button>
  );
}
