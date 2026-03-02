import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import {
  colors,
  gradients,
  typography,
  borderRadius,
  shadows,
  animation,
  spacing,
  mq,
} from '../../styles/theme';

export type ButtonVariant = 'primary' | 'secondary' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  isLoading?: boolean;
}

const spin = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`;

const Spinner = styled.span`
  display: inline-flex;
  width: 1em;
  height: 1em;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  animation: ${spin} 0.65s linear infinite;
  flex-shrink: 0;
`;

const sizeStyles: Record<ButtonSize, ReturnType<typeof css>> = {
  sm: css`
    padding: ${spacing[2]} ${spacing[5]};
    font-size: ${typography.sizes.xs};
    letter-spacing: ${typography.letterSpacing.widest};
    min-height: 36px;
    gap: ${spacing[1.5]};
  `,
  md: css`
    padding: ${spacing[3]} ${spacing[8]};
    font-size: ${typography.sizes.sm};
    letter-spacing: ${typography.letterSpacing.widest};
    min-height: 48px;
    gap: ${spacing[2]};

    ${mq.md} {
      padding: ${spacing[3.5]} ${spacing[10]};
    }
  `,
  lg: css`
    padding: ${spacing[4]} ${spacing[10]};
    font-size: ${typography.sizes.base};
    letter-spacing: ${typography.letterSpacing.wider};
    min-height: 56px;
    gap: ${spacing[2.5]};

    ${mq.md} {
      padding: ${spacing[4]} ${spacing[12]};
      font-size: ${typography.sizes.md};
    }
  `,
};

const variantStyles: Record<ButtonVariant, ReturnType<typeof css>> = {
  // filter: drop-shadow() instead of box-shadow — garantees border-radius
  // is respected inside GPU compositing layers (transform ancestors).
  primary: css`
    background: ${colors.cobalt};
    color: ${colors.white};
    border: 2px solid ${colors.cobalt};
    filter: drop-shadow(0 2px 8px rgba(2, 18, 238, 0.16));

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: ${gradients.buttonGloss};
      border-radius: inherit;
      pointer-events: none;
      opacity: 1;
      transition: opacity ${animation.transitions.fast};
    }

    &:hover:not(:disabled) {
      background: ${colors.cobaltDark};
      border-color: ${colors.cobaltDark};
      filter: drop-shadow(0 8px 32px rgba(2, 18, 238, 0.28))
              drop-shadow(0 4px 12px rgba(2, 18, 238, 0.16));
      transform: translateY(-3px);

      &::before {
        opacity: 0.5;
      }
    }

    &:active:not(:disabled) {
      transform: translateY(-1px);
      filter: drop-shadow(0 2px 8px rgba(2, 18, 238, 0.16));
    }
  `,

  secondary: css`
    background: ${colors.cherry};
    color: ${colors.white};
    border: 2px solid ${colors.cherry};
    filter: drop-shadow(0 3px 12px rgba(210, 0, 1, 0.18));

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: ${gradients.buttonGloss};
      border-radius: inherit;
      pointer-events: none;
    }

    &:hover:not(:disabled) {
      background: ${colors.cherryDark};
      border-color: ${colors.cherryDark};
      filter: drop-shadow(0 8px 32px rgba(210, 0, 1, 0.28))
              drop-shadow(0 4px 12px rgba(210, 0, 1, 0.16));
      transform: translateY(-3px);
    }

    &:active:not(:disabled) {
      transform: translateY(-1px);
      filter: drop-shadow(0 2px 8px rgba(210, 0, 1, 0.18));
    }
  `,

  outline: css`
    background-image: linear-gradient(
      to right,
      ${colors.cobalt} 50%,
      transparent   50%
    );
    background-size:     200% 100%;
    background-position: 100% center;   /* shows transparent half at rest */
    color:  ${colors.cobalt};
    border: 2px solid ${colors.cobalt};

    /* Override base transition to include background-position */
    transition:
      background-position ${animation.transitions.normal},
      color               ${animation.transitions.normal},
      box-shadow          ${animation.transitions.slow},
      transform           ${animation.transitions.spring},
      opacity             ${animation.transitions.fast};

    &:hover:not(:disabled) {
      background-position: 0% center;   /* slides cobalt half into view */
      color:      ${colors.white};
      box-shadow: ${shadows.cobaltSm};
      transform:  translateY(-3px);
    }

    &:active:not(:disabled) {
      transform:  translateY(-1px);
      box-shadow: ${shadows.cobaltXs};
    }
  `,
};

const StyledButton = styled.button<{
  $variant: ButtonVariant;
  $size: ButtonSize;
  $fullWidth: boolean;
}>`
  appearance: none;
  -webkit-appearance: none;
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;

  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  ${({ $size }) => sizeStyles[$size]}
  ${({ $fullWidth }) => $fullWidth && css`width: 100%;`}

  font-family: ${typography.fonts.body};
  font-weight: ${typography.weights.medium};
  text-transform: uppercase;
  text-align: center;
  white-space: nowrap;
  line-height: 1;

  border-radius: ${borderRadius.pill};

  transition:
    background-color ${animation.transitions.normal},
    border-color ${animation.transitions.normal},
    box-shadow ${animation.transitions.slow},
    filter ${animation.transitions.slow},
    transform ${animation.transitions.spring},
    color ${animation.transitions.fast},
    opacity ${animation.transitions.fast};

  ${({ $variant }) => variantStyles[$variant]}

  &:disabled {
    opacity: 0.42;
    cursor: not-allowed;
    pointer-events: none;
  }

  &:focus-visible {
    outline: 2px solid ${colors.cobalt};
    outline-offset: 4px;
  }
`;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref,
  ) => (
    <StyledButton
      ref={ref}
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      {...props}
    >
      {isLoading && <Spinner aria-hidden="true" />}
      {children}
    </StyledButton>
  ),
);

Button.displayName = 'Button';
