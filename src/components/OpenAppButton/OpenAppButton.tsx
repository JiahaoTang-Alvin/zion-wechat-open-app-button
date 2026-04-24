import React from 'react';
import { EventHandler, State } from 'zvm-code-context';
import styles from './style.module.scss';

export interface OpenAppButtonPropData {
  buttonText?: string;
  appParameter?: string;
  width?: string;
  height?: string;
  paddingVertical?: number;
  paddingHorizontal?: number;
  paddingUnit?: string;
  borderWidth?: number;
  borderRadius?: number;
  borderUnit?: string;
  borderColor?: string;
  backgroundColor?: string;
  textColor?: string;
  fontSize?: number;
  fontUnit?: string;
  fontWeight?: number;
  fontFamily?: string;
  disabled?: boolean;
}

export interface OpenAppButtonStateData {
  clickCount?: State<number>;
  lastErrorMessage?: State<string>;
}

export interface OpenAppButtonEvent {
  onTap?: EventHandler;
  onLaunchError?: EventHandler;
}

export interface OpenAppButtonProps {
  propData: OpenAppButtonPropData;
  propState: OpenAppButtonStateData;
  event: OpenAppButtonEvent;
}

interface MiniProgramButtonAttributes {
  'open-type'?: string;
  'app-parameter'?: string;
  'hover-class'?: string;
  binderror?: (error: unknown) => void;
  openType?: string;
  appParameter?: string;
}

function safeText(value: string | undefined, fallback: string): string {
  const trimmed = value?.trim();
  return trimmed ? trimmed : fallback;
}

function safeCssValue(value: string | undefined, fallback: string): string {
  const trimmed = value?.trim();
  if (!trimmed || trimmed.includes(';')) {
    return fallback;
  }
  return trimmed;
}

function safeColorValue(value: string | undefined, fallback: string): string {
  const safeValue = safeCssValue(value, fallback);
  if (/^[0-9a-fA-F]{3}$/.test(safeValue)) {
    return `#${safeValue}`;
  }
  if (/^[0-9a-fA-F]{4}$/.test(safeValue)) {
    return `#${safeValue}`;
  }
  if (/^[0-9a-fA-F]{6}$/.test(safeValue)) {
    return `#${safeValue}`;
  }
  if (/^[0-9a-fA-F]{8}$/.test(safeValue)) {
    return `#${safeValue}`;
  }
  return safeValue;
}

function safeUnit(value: string | undefined, fallback: string): string {
  const trimmed = value?.trim();
  if (!trimmed || !/^[a-zA-Z%]+$/.test(trimmed)) {
    return fallback;
  }
  return trimmed;
}

function safeNumber(
  value: number | undefined,
  fallback: number,
  min: number,
  max: number
): number {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    return fallback;
  }
  return Math.min(max, Math.max(min, value));
}

function toCssLength(
  value: number | undefined,
  fallback: number,
  unit: string,
  min = 0,
  max = 1000
): string {
  return `${safeNumber(value, fallback, min, max)}${unit}`;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function readErrMsg(value: unknown): string {
  if (!isRecord(value)) {
    return '';
  }

  const detail = value.detail;
  if (isRecord(detail) && typeof detail.errMsg === 'string') {
    return detail.errMsg;
  }

  const nativeEvent = value.nativeEvent;
  if (isRecord(nativeEvent) && isRecord(nativeEvent.detail)) {
    const errMsg = nativeEvent.detail.errMsg;
    return typeof errMsg === 'string' ? errMsg : '';
  }

  return '';
}

export function OpenAppButton({
  propData,
  propState,
  event,
}: OpenAppButtonProps) {
  const paddingUnit = safeUnit(propData.paddingUnit, 'px');
  const borderUnit = safeUnit(propData.borderUnit, 'px');
  const fontUnit = safeUnit(propData.fontUnit, 'px');
  const borderWidth = safeNumber(propData.borderWidth, 1, 0, 100);
  const disabled = !!propData.disabled;
  const resolvedWidth = safeCssValue(propData.width, '100%');
  const resolvedHeight = safeCssValue(propData.height, 'auto');

  const containerStyle: React.CSSProperties = {
    boxSizing: 'border-box',
    width: resolvedWidth,
    maxWidth: '100%',
    minWidth: 0,
    height: resolvedHeight === 'auto' ? 'auto' : resolvedHeight,
  };

  const buttonStyle: React.CSSProperties = {
    width: '100%',
    height: resolvedHeight === 'auto' ? 'auto' : '100%',
    padding: `${toCssLength(
      propData.paddingVertical,
      12,
      paddingUnit
    )} ${toCssLength(propData.paddingHorizontal, 18, paddingUnit)}`,
    borderWidth: `${borderWidth}${borderUnit}`,
    borderStyle: borderWidth > 0 ? 'solid' : 'none',
    borderColor: safeColorValue(propData.borderColor, '#1f2937'),
    borderRadius: toCssLength(propData.borderRadius, 8, borderUnit),
    backgroundColor: safeColorValue(propData.backgroundColor, '#111827'),
    color: safeColorValue(propData.textColor, '#ffffff'),
    fontSize: toCssLength(propData.fontSize, 16, fontUnit, 8, 80),
    fontWeight: safeNumber(propData.fontWeight, 600, 100, 900),
    fontFamily: safeCssValue(propData.fontFamily, 'inherit'),
    opacity: disabled ? 0.55 : 1,
  };

  const handleClick = () => {
    const currentCount = propState.clickCount?.get();
    const nextCount = typeof currentCount === 'number' ? currentCount + 1 : 1;
    propState.clickCount?.set(nextCount);
    event.onTap?.();
  };

  const handleLaunchError = (error: unknown) => {
    const errMsg = readErrMsg(error) || 'launchApp failed';
    propState.lastErrorMessage?.set(errMsg);
    event.onLaunchError?.();
  };

  const miniProgramAttributes: MiniProgramButtonAttributes = disabled
    ? {}
    : {
        'open-type': 'launchApp',
        'app-parameter': safeText(propData.appParameter, ''),
        'hover-class': styles['buttonHover'],
        binderror: handleLaunchError,
        openType: 'launchApp',
        appParameter: safeText(propData.appParameter, ''),
      };

  return (
    <div className={styles['root']} style={containerStyle}>
      <button
        {...miniProgramAttributes}
        type="button"
        className={styles['button']}
        style={buttonStyle}
        disabled={disabled}
        onClick={handleClick}
        onError={handleLaunchError}
      >
        {safeText(propData.buttonText, '打开 APP')}
      </button>
    </div>
  );
}
