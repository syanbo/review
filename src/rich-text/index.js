/**
 * Author   : Syan
 * Date     : 2018/9/30
 * Project [ review ] Coded on WebStorm.
 */

import React from 'react';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import styled from 'styled-components';
import initialValue from './value.json';

const Button = styled.button`
  height: 44px;
  border-radius: 22px;
  padding: 0 40px;
  font-size: 16px;
  color: #333333;
  outline: none;
`;

const DEFAULT_NODE = 'paragraph';

class RichTextExample extends React.Component {
  state = {
    value: Value.fromJSON(initialValue),
  };

  onChange = ({ value }) => {
    this.setState({ value });
  };

  onKeyDown = () => {
    // console.log(event, change);
  };

  renderNode = props => {
    const { attributes, children, node } = props;

    switch (node.type) {
      case 'block-quote':
        return <blockquote {...attributes}>{children}</blockquote>;
      case 'bulleted-list':
        return <ul {...attributes}>{children}</ul>;
      case 'heading-one':
        return <h1 {...attributes}>{children}</h1>;
      case 'heading-two':
        return <h2 {...attributes}>{children}</h2>;
      case 'list-item':
        return <li {...attributes}>{children}</li>;
      case 'numbered-list':
        return <ol {...attributes}>{children}</ol>;
      default:
        return null;
    }
  };

  renderMark = props => {
    const { children, mark, attributes } = props;

    switch (mark.type) {
      case 'bold':
        return <strong {...attributes}>{children}</strong>;
      case 'code':
        return <code {...attributes}>{children}</code>;
      case 'italic':
        return <em {...attributes}>{children}</em>;
      case 'underlined':
        return <u {...attributes}>{children}</u>;
      default:
        return null;
    }
  };

  onClickMark = (event, type) => {
    event.preventDefault();
    const { value } = this.state;
    const change = value.change().toggleMark(type);
    this.onChange(change);
  };

  hasBlock = type => {
    const { value } = this.state;
    return value.blocks.some(node => node.type === type);
  };

  onClickBlock = (event, type) => {
    event.preventDefault();
    const { value } = this.state;
    const change = value.change();
    const { document } = value;

    // Handle everything but list buttons.
    if (type !== 'bulleted-list' && type !== 'numbered-list') {
      const isActive = this.hasBlock(type);
      const isList = this.hasBlock('list-item');

      if (isList) {
        change
          .setBlocks(isActive ? DEFAULT_NODE : type)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list');
      } else {
        change.setBlocks(isActive ? DEFAULT_NODE : type);
      }
    } else {
      // Handle the extra wrapping required for list buttons.
      const isList = this.hasBlock('list-item');
      const isType = value.blocks.some(
        block => !!document.getClosest(block.key, parent => parent.type === type)
      );

      if (isList && isType) {
        change
          .setBlocks(DEFAULT_NODE)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list');
      } else if (isList) {
        change
          .unwrapBlock(type === 'bulleted-list' ? 'numbered-list' : 'bulleted-list')
          .wrapBlock(type);
      } else {
        change.setBlocks('list-item').wrapBlock(type);
      }
    }

    this.onChange(change);
  };

  render() {
    const { value } = this.state;
    return (
      <div>
        <Button onClick={event => this.onClickMark(event, 'bold')}>加粗</Button>
        <Button onClick={event => this.onClickMark(event, 'italic')}>斜体</Button>
        <Button onClick={event => this.onClickMark(event, 'underlined')}>下划线</Button>
        <Button onClick={event => this.onClickMark(event, 'code')}>代码</Button>
        <Button onClick={event => this.onClickBlock(event, 'block-quote')}>block-quote</Button>
        <Editor
          spellCheck
          autoFocus
          placeholder="Enter some rich text..."
          value={value}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          renderNode={this.renderNode}
          renderMark={this.renderMark}
        />
      </div>
    );
  }
}

export default RichTextExample;
