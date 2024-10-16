import { AppBarComponent, IAppBarLeftContentOptions, IAppBarOptions, IAppBarRightContentOptions } from './src/components/appBar'
import { DefaultPageComponent, IDefaultPageLeftAnchorOptions, IDefaultPageLeftDrawerOptions, IDefaultPageMainAnchorOptions, IDefaultPageRightAnchorOptions, IDefaultPageRightDrawerOptions } from './src/components/defaultPage'
import { FlexGrowComponent } from './src/components/flexGrow'
import { FormItemStyled, FormStyled, Form10x20Styled, FormItem10x20Styled } from './src/components/forms'
import { GlobalProgressBarComponent } from './src/components/globalProgressBar'
import { ImageComponent } from './src/components/image'
import { LoginComponent } from './src/components/auth/login'
import { RequiredAuthWrapperComponentProps, RequiredAuthWrapperComponent } from './src/components/auth/requiredAuthWrapper'
import { SelectImgComponent } from './src/components/selectImg'
import { TableComponent, TableComponentProps } from './src/components/table'
import { TableBaseComponent, TableBaseComponentProps } from './src/components/table/base'
import { StyledListItemText, StyledTableCell, StyledTableRow, SupportedLocales, TableComponentClickRowProps, TableComponentSetCurrPageProps } from './src/components/table/common'
import { TableObjWrapperComponent } from './src/components/table/objWrapper'
import { TextPwdComponent } from './src/components/textPwd'
import './src/styles/index.css'

import authenticationReducer, { authenticationStateLogout, authenticationStateSet, IAuthenticationAction, IAuthenticationState } from './src/redux/reducers/authenticationtest.slice'
import progressReducer, { progressStateSet } from './src/redux/reducers/globalProgress.slice'
import stylesReducer, { IStylesAction, IStylesState } from './src/redux/reducers/styles.slice'
import { getRootState, IDefaultAction, IDefaultState, IRootState } from './src/redux/types'

export {
  AppBarComponent, IAppBarOptions, IAppBarLeftContentOptions, IAppBarRightContentOptions,
  DefaultPageComponent, IDefaultPageLeftAnchorOptions, IDefaultPageRightAnchorOptions, IDefaultPageLeftDrawerOptions, IDefaultPageRightDrawerOptions, IDefaultPageMainAnchorOptions,
  FlexGrowComponent,
  FormStyled, FormItemStyled, Form10x20Styled, FormItem10x20Styled,
  GlobalProgressBarComponent,
  ImageComponent,
  SelectImgComponent,
  TextPwdComponent,
  LoginComponent, RequiredAuthWrapperComponentProps, RequiredAuthWrapperComponent,
  TableBaseComponent, TableBaseComponentProps, TableComponent, TableComponentProps, 
  StyledListItemText, StyledTableCell, StyledTableRow, SupportedLocales, TableComponentClickRowProps, TableComponentSetCurrPageProps,
  TableObjWrapperComponent,
  
  // REDUX
  IRootState, IDefaultAction, IDefaultState,
  getRootState,
  authenticationReducer, authenticationStateLogout, authenticationStateSet, IAuthenticationState, IAuthenticationAction,
  stylesReducer, IStylesState, IStylesAction,
  progressReducer, progressStateSet
}
