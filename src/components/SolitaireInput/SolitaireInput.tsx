import React, { memo, useRef } from 'react';
import cn from 'clsx';
import { Button, Form, Input, message as messageAnt } from 'antd';
import { CopyOutlined, DeleteOutlined } from '@ant-design/icons';
import { copyToClipboard } from '../../utils/copyToClipboard';
import s from './SolitaireInput.sass';

export type SolitaireInputProps = {
  className?: string;
  value: string;
  message: string;
  manage: (value: string) => void;
  onChange: (value: string) => void;
};

export const SolitaireInput = memo<SolitaireInputProps>(({ className, onChange, message, manage, value }) => {
  const input = useRef<Input>();

  const onCopy = (): void => {
    if (value) {
      copyToClipboard(value)
        .then(() => {
          messageAnt.success('Скопировано в буфер обмена');
        })
        .catch((e) => {
          messageAnt.error('Что-то пошло не так, не удалось скопировать в буфер');
          console.error(e); // eslint-disable-line no-console
        });
    }
  };

  const onReset = (): void => {
    onChange('');
    input.current.input.focus();
  };

  const onClick = (): void => {
    if (value) {
      manage(value);
    }
  };

  const validateStatus = message ? 'error' : '';

  return (
    <div className={cn(s.root, className)}>
      <Form.Item help={message} validateStatus={validateStatus} className={s.error}>
        <div className={s.top}>
          <Button onClick={onReset} type="primary" danger>
            <DeleteOutlined />
          </Button>
          <Input
            autoFocus
            ref={input}
            onPressEnter={onClick}
            value={value}
            onChange={(e): void => onChange(e.target.value)}
            className={s.input}
          />
          <Button color="#ccc" onClick={onCopy} type="primary">
            <CopyOutlined />
          </Button>
        </div>
      </Form.Item>
    </div>
  );
});

SolitaireInput.displayName = 'SolitaireInput';
