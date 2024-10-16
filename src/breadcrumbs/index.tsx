// 16-10-2024 

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BreadcrumbData } from 'use-react-router-breadcrumbs';

// ICONS
import { styled } from '@mui/material';
import { IoMdHome as HomeIcon } from 'react-icons/io';
import { MdOutlineArrowForwardIos as DividerIcon } from 'react-icons/md';

// STYLE
const breadcrumbAlignItem: React.CSSProperties = { display: 'flex', alignSelf: 'center' }
const breadcrumbLinkDecoration: React.CSSProperties = { textDecoration: 'none', color: '#166CC8' }
const colorUnlink: React.CSSProperties = { color: '#606060' }

const BreadcrumbWrapperStyled = styled('div')(({ theme }) => ({
  display: 'flex',
  width: '100%',
  paddingBlock: 10,
  paddingInline: 10,
  boxSizing: 'border-box',
  [theme.breakpoints.up('sm')]: {
    paddingInline: 20,
  }
}))

export interface IBreadcrumbsBaseComponentProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  homeRouteName: string,
  breadcrumbs: BreadcrumbData<string>[],
  unLink?: string[],
}

export const BreadcrumbsBaseComponent: React.FC<IBreadcrumbsBaseComponentProps> = ({ homeRouteName, breadcrumbs, unLink, ...props }) => {
  // const unLink = [
  //   '/bla',
  //   '/blabla'
  // ]

  const location = useLocation()
  // const breadcrumbs = useReactRouterBreadcrumbs([
  //   {
  //     path: RoutesNames.home,
  //     breadcrumb: 'Home'
  //   },
  //   {
  //     path: RoutesNames.masters,
  //     breadcrumb: 'Masters route description',
  //     children: [{
  //       path: RoutesNames.child,
  //     }]
  //   },
  // ]);

  const checkArrays = (arrayA: any[], arrayB: any[]) => arrayA.some(r => arrayB.indexOf(r) >= 0)

  return <>
    <BreadcrumbWrapperStyled {...props}>
      {breadcrumbs.map((args, index) => {
        return <React.Fragment key={index}>
          {/* HOME */}
          {args.match.pathname == homeRouteName ?
            <Link style={breadcrumbAlignItem} to={args.match.pathname}>
              <HomeIcon style={{ ...breadcrumbAlignItem, color: '#166CC8', marginRight: 5 }} />
            </Link> : null}

          <span style={{ ...breadcrumbAlignItem }}>
            {/* ARROW DIVIDER */}
            {args.match.pathname != homeRouteName ?
              <DividerIcon style={{ ...breadcrumbAlignItem, margin: '0px 5px 0px 5px', color: '#505050' }} /> : null}

            {/* PATH/ROUTES NAMES */}
            {[':id', 'new'].includes(args.match.params.id ?? '') ? 'Novo' : location.pathname == args.match.pathname ?
              <div style={colorUnlink}> {args.breadcrumb}</div> :
              checkArrays([args.match.pathname], unLink ?? []) ?
                <div style={colorUnlink}>{args.match.route?.breadcrumb as string}</div> :
                <Link style={breadcrumbLinkDecoration} to={args.match.pathname}>{args.breadcrumb}</Link>}
          </span>
        </React.Fragment>
      })}
    </BreadcrumbWrapperStyled>
  </>
}