import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionProps,
  AccordionSummary,
  SxProps,
  Theme,
  Typography,
  useTheme
} from "@mui/material";
import React, { ReactNode, useState } from "react";

export interface AccordionGroupItem {
  id: string;
  title: ReactNode;
  error?: boolean | undefined,
  helperText?: React.ReactNode,
  onTitleClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, willExpand: boolean) => void,
  content: ReactNode;
  expanded?: boolean,
  accordionProps?: Omit<AccordionProps,
    'children' | 'defaultExpanded' | 'key' | 'expanded' | 'onChange' | 'disableGutters' | 'square'>
}

export interface AccordionGroupProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  items: AccordionGroupItem[];
  radius?: number;
  gap?: any,
  accordionProps?: Omit<AccordionProps,
    'children' | 'defaultExpanded' | 'key' | 'expanded' | 'onChange' | 'disableGutters' | 'square'>
}

export const AccordionGroup = ({ items, radius = 15, accordionProps, gap = .5, ...props }: AccordionGroupProps) => {
  const [expanded, setExpanded] = useState<string | false>(items.findLast(i => i.expanded)?.id ?? false);
  const theme = useTheme()

  const handleChange =
    (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <div {...props}>
      {items.map((item, index) => {
        const isFirst = index === 0;
        const isLast = index === items.length - 1;
        const isExpanded = expanded === item.id;
        const prevExpanded = expanded === items[index - 1]?.id;
        const nextExpanded = expanded === items[index + 1]?.id;

        let topLeft = 0;
        let topRight = 0;
        let bottomRight = 0;
        let bottomLeft = 0;

        // aberto → todos os cantos arredondados
        if (isExpanded) {
          topLeft = topRight = bottomRight = bottomLeft = radius;
        }

        // primeiro → cantos superiores
        if (isFirst) {
          topLeft = radius;
          topRight = radius;
        }

        // último → cantos inferiores
        if (isLast) {
          bottomRight = radius;
          bottomLeft = radius;
        }

        // se o anterior está expandido → cantos superiores
        if (prevExpanded) {
          topLeft = radius;
          topRight = radius;
        }

        // se o próximo está expandido → cantos inferiores
        if (nextExpanded) {
          bottomRight = radius;
          bottomLeft = radius;
        }

        const borderRadius = `${topLeft}px ${topRight}px ${bottomRight}px ${bottomLeft}px`;

        return (
          <Accordion
            {...accordionProps}
            {...item.accordionProps}

            // https://chatgpt.com/share/6a341211-bed8-83e9-8c6a-a752cd10f3ac
            // defaultExpanded={item.defaultExpanded}
            key={item.id}
            expanded={isExpanded}
            onChange={handleChange(item.id)}
            disableGutters
            square={false}
            style={{
              borderRadius,
              borderBottom: !isExpanded && !isLast && !nextExpanded ? `1px solid ${theme.palette.divider}` : undefined,
              ...accordionProps?.style,
              ...item.accordionProps?.style
            }}
            sx={{
              mb: isExpanded || nextExpanded ? gap : undefined,
              overflow: "hidden",
              "&:before": {
                display: "none", // remove a linha padrão do Accordion
              },
              ...accordionProps?.sx,
              ...item.accordionProps?.sx
            } as SxProps<Theme>}

          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{
                color: accordionProps?.style?.color ?? item.accordionProps?.style?.color
              }} />}
              aria-controls={`${item.id}-content`}
              id={`${item.id}-header`}
              onClick={(e) => item.onTitleClick?.(e, !isExpanded)}
              style={{
                color: item.error ? theme.palette.error.main : undefined
              }}
            >
              <span style={{ display: 'flex', flexDirection: 'column' }}>
                <Typography component="span" style={{ width: '100%', paddingRight: 15 }}>{item.title}</Typography>
                <Typography component="span" style={{ width: '100%', paddingRight: 15, display: 'block' }} variant='caption'>{item.helperText}</Typography>
              </span>
            </AccordionSummary>
            <AccordionDetails>
              {item.content}
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
}
