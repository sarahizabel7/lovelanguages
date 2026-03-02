import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import {
  colors,
  gradients,
  typography,
  borderRadius,
  shadows,
  spacing,
  animation,
  mq,
} from '../../styles/theme';

export type CardVariant = 'default' | 'elevated' | 'bordered' | 'ghost' | 'editorial';
export type CardPadding = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface CardProps {
  children: React.ReactNode;
  variant?: CardVariant;
  padding?: CardPadding;
  /** Enables lift + shadow on hover/focus */
  hoverable?: boolean;
  /** Renders atmospheric pink blob and cobalt accent dot */
  decorative?: boolean;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(-2deg) scale(1); }
  50%       { transform: translateY(-12px) rotate(2deg) scale(1.04); }
`;

const blobEntrance = keyframes`
  from {
    opacity: 0;
    transform: scale(0.6) rotate(-20deg);
  }
  to {
    opacity: 0.65;
    transform: scale(1) rotate(-2deg);
  }
`;

const paddingMap: Record<CardPadding, string> = {
  none: '0',
  xs:   spacing[3],
  sm:   `${spacing[4]} ${spacing[5]}`,
  md:   `${spacing[6]} ${spacing[7]}`,
  lg:   `${spacing[8]} ${spacing[10]}`,
  xl:   `${spacing[10]} ${spacing[12]}`,
};

const variantBase: Record<CardVariant, ReturnType<typeof css>> = {
  default: css`
    background: ${colors.white};
    border: 1.5px solid ${colors.border};
    box-shadow: ${shadows.sm};
  `,
  elevated: css`
    background: ${colors.white};
    border: 1.5px solid transparent;
    box-shadow: ${shadows.md};
  `,
  bordered: css`
    background: ${colors.white};
    border: 2px solid ${colors.pink};
    box-shadow: none;
  `,
  ghost: css`
    background: ${colors.sandLight};
    border: 1.5px solid ${colors.borderSubtle};
    box-shadow: none;
  `,
  editorial: css`
    background: ${colors.white};
    background-image: ${gradients.cardMesh};
    border: none;
    box-shadow: ${shadows.lg};

    &::before {
      content: '';
      position: absolute;
      top: ${spacing[5]};
      bottom: ${spacing[5]};
      left: 0;
      width: 3px;
      background: ${gradients.pinkToCobalt};
      border-radius: ${borderRadius.pill};
    }
  `,
};

const hoverBase: Record<CardVariant, ReturnType<typeof css>> = {
  default: css`
    &:hover {
      border-color: ${colors.pink};
      box-shadow: ${shadows.pink};
      transform: translateY(-5px);
    }
  `,
  elevated: css`
    &:hover {
      box-shadow: ${shadows.xl};
      transform: translateY(-7px);
    }
  `,
  bordered: css`
    &:hover {
      border-color: ${colors.cobalt};
      box-shadow: ${shadows.cobaltSm};
      transform: translateY(-5px);
    }
  `,
  ghost: css`
    &:hover {
      background: ${colors.pinkGhost};
      border-color: ${colors.pink};
      box-shadow: ${shadows.pinkSm};
      transform: translateY(-4px);
    }
  `,
  editorial: css`
    &:hover {
      box-shadow: ${shadows['2xl']};
      transform: translateY(-6px);
    }
  `,
};

const Blob = styled.div`
  position: absolute;
  top: -28px;
  right: -28px;
  width: 120px;
  height: 120px;
  background: ${gradients.pinkRadial};
  border-radius: 63% 37% 54% 46% / 55% 48% 52% 45%;
  pointer-events: none;
  opacity: 0.65;
  z-index: 0;
  animation:
    ${blobEntrance} 0.6s ${animation.easings.smooth} both,
    ${float} 7s ease-in-out infinite 0.6s;
`;

const AccentDot = styled.div`
  position: absolute;
  bottom: ${spacing[4]};
  right: ${spacing[6]};
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${colors.cobaltGhost};
  border: 2px solid rgba(2, 18, 238, 0.18);
  pointer-events: none;
  z-index: 0;
`;

const AccentLine = styled.div`
  position: absolute;
  bottom: 0;
  left: ${spacing[6]};
  width: 40px;
  height: 2px;
  background: ${gradients.pinkToCherry};
  border-radius: ${borderRadius.pill};
  pointer-events: none;
  z-index: 0;
  opacity: 0.6;
`;

const Inner = styled.div`
  position: relative;
  z-index: 1;
  height: 100%;
`;

const StyledCard = styled.div<{
  $variant: CardVariant;
  $padding: CardPadding;
  $hoverable: boolean;
  $clickable: boolean;
}>`
  position: relative;
  overflow: hidden;
  border-radius: ${borderRadius['2xl']};
  padding: ${({ $padding }) => paddingMap[$padding]};

  ${({ $variant }) => variantBase[$variant]}

  transition:
    background ${animation.transitions.normal},
    border-color ${animation.transitions.normal},
    box-shadow ${animation.transitions.slow},
    transform ${animation.transitions.spring};

  ${({ $hoverable, $variant }) =>
    $hoverable &&
    css`
      cursor: pointer;
      ${hoverBase[$variant]}

      &:active {
        transform: translateY(-2px) !important;
        transition-duration: 100ms;
      }
    `}

  ${({ $clickable }) =>
    $clickable &&
    css`
      cursor: pointer;
    `}

  &:focus-visible {
    outline: 2px solid ${colors.cobalt};
    outline-offset: 3px;
  }
`;

export function Card({
  children,
  variant = 'default',
  padding = 'md',
  hoverable = false,
  decorative = false,
  className,
  onClick,
}: CardProps) {
  return (
    <StyledCard
      $variant={variant}
      $padding={padding}
      $hoverable={hoverable || !!onClick}
      $clickable={!!onClick}
      className={className}
      onClick={onClick}
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? 'button' : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick(e as unknown as React.MouseEvent<HTMLDivElement>);
              }
            }
          : undefined
      }
    >
      {decorative && (
        <>
          <Blob aria-hidden="true" />
          <AccentDot aria-hidden="true" />
          <AccentLine aria-hidden="true" />
        </>
      )}
      <Inner>{children}</Inner>
    </StyledCard>
  );
}
