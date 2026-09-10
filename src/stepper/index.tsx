import { Box, Button, Orientation, Step, StepContent, StepLabel, Stepper, Typography } from '@mui/material'
import { StrictOmit } from 'fwork-jsts-common'
import React from 'react'

export type StepData = {
  id: string,
  label: string,
  element: React.ReactNode
}

export type StepComponentProps = {
  step: StepData,
  stepIndex: number,
  isLast: boolean,
  orientation: Orientation,
  setActiveStepIdx: React.Dispatch<React.SetStateAction<number>>
  onDisableNext?: (step: StepData) => boolean,
  onFinishConfirm?: (step: StepData) => void,
}

export const StepComponent = ({
  step,
  stepIndex,
  isLast,
  orientation,
  setActiveStepIdx,
  onDisableNext,
  onFinishConfirm,
}: StepComponentProps) => {
  const nextStep = (args: {
    last: boolean,
    step: StepData,
  }) => {
    if (args.last) {
      onFinishConfirm?.(args.step)
      return
    }
    setActiveStepIdx(prevActiveStep => prevActiveStep + 1);
  };

  const prevStep = () => {
    setActiveStepIdx(prevActiveStep => prevActiveStep - 1);
  };

  return <div style={{ display: 'flex', flexDirection: 'column', flex: 1, marginTop: orientation == 'horizontal' ? 20 : undefined }}>
    {step.element}

    <Box
      sx={{
        marginTop: '20px',
        mb: orientation == 'horizontal' ? undefined : 2,
        display: 'flex',
        gap: 1,
        justifyContent: orientation == 'horizontal' ? 'flex-end' : undefined,
        alignItems: orientation == 'horizontal' ? 'flex-end' : 'center',
        flex: orientation == 'horizontal' ? 1 : undefined,
      }}
    >
      {stepIndex ? <Button
        variant='outlined'
        disabled={stepIndex === 0}
        onClick={prevStep}
        sx={{
          // mt: 1,
          // mr: 1,
          width: '100px'
        }}
      >
        Voltar
      </Button> : <></>}

      <Button
        disabled={onDisableNext?.(step)}
        variant="contained"
        onClick={(_) => {
          nextStep({
            last: isLast,
            step,
          })
        }}
        sx={{
          // mt: 1,
          // mr: 1,
          width: '100px'
        }}
      >
        {isLast ? 'Concluir' : 'Próximo'}
      </Button>
    </Box>
  </div>
}

export type StepperComponentProps = {
  steps: Record<string, StepData>,
  orientation: Orientation,
  onDisableNext?: (step: StepData) => boolean,
  onFinishConfirm?: (step: StepData) => void,
  style?: StrictOmit<React.CSSProperties, 'display' | 'flexDirection'> | undefined,
} & StrictOmit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'style'>

export const StepperComponent: React.FC<StepperComponentProps> = ({ steps, orientation, onDisableNext, onFinishConfirm, ...props }) => {
  const [activeStepIdx, setActiveStepIdx] = React.useState(0);
  const stepsLen = Object.keys(steps).length

  return <div className='stepper-component' {...props} style={{ ...props.style, display: 'flex', flexDirection: 'column' }}>
    {stepsLen > 1 && activeStepIdx < stepsLen && <Stepper activeStep={activeStepIdx} orientation={orientation}>
      {(Object.values(steps)).map((step, index) => {
        const last = index === stepsLen - 1
        return <Step key={step.label}>
          <StepLabel
            optional={
              last ? (
                <Typography variant="caption">Último passo</Typography>
              ) : null
            }
          >
            {step.label}
          </StepLabel>

          {orientation == 'vertical' && <StepContent>
            <StepComponent
              orientation={orientation}
              step={step}
              stepIndex={index}
              isLast={last}
              setActiveStepIdx={setActiveStepIdx}
              onDisableNext={onDisableNext}
              onFinishConfirm={onFinishConfirm}
            /></StepContent>}
        </Step>
      })}
    </Stepper>}

    {(stepsLen == 1 || orientation == 'horizontal') && <StepComponent
      orientation={orientation}
      step={steps[Object.keys(steps)[activeStepIdx]]}
      stepIndex={activeStepIdx}
      isLast={activeStepIdx == stepsLen - 1}
      setActiveStepIdx={setActiveStepIdx}
      onDisableNext={onDisableNext}
      onFinishConfirm={onFinishConfirm}
    />}
  </div>
}