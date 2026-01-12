import { FloatActionButtonComponent } from '@lib/floatActionButton'

export const FloatActionButtonComponentExample = () => {
    return <>
        <FloatActionButtonComponent
            ariaLabel=''
            confirmProps={{
                onClick: () => alert('confirmClick'),
                toolTip: {
                    title: 'Confirm',
                    "aria-label": '',
                    placement: 'left'
                }
            }}
        />
    </>
}