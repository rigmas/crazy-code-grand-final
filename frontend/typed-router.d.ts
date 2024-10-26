/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck
// Generated by unplugin-vue-router. ‼️ DO NOT MODIFY THIS FILE ‼️
// It's recommended to commit this file.
// Make sure to add this file to your tsconfig.json file as an "includes" or "files" entry.

declare module 'vue-router/auto-routes' {
  import type {
    RouteRecordInfo,
    ParamValue,
    ParamValueOneOrMore,
    ParamValueZeroOrMore,
    ParamValueZeroOrOne,
  } from 'vue-router'

  /**
   * Route name map generated by unplugin-vue-router
   */
  export interface RouteNamedMap {
    '/': RouteRecordInfo<'/', '/', Record<never, never>, Record<never, never>>,
    '/[...all]': RouteRecordInfo<'/[...all]', '/:all(.*)', { all: ParamValue<true> }, { all: ParamValue<false> }>,
    '/home/': RouteRecordInfo<'/home/', '/home', Record<never, never>, Record<never, never>>,
    '/profile/': RouteRecordInfo<'/profile/', '/profile', Record<never, never>, Record<never, never>>,
    '/qr/': RouteRecordInfo<'/qr/', '/qr', Record<never, never>, Record<never, never>>,
    '/quest/': RouteRecordInfo<'/quest/', '/quest', Record<never, never>, Record<never, never>>,
    '/quest/[id]/photo/': RouteRecordInfo<'/quest/[id]/photo/', '/quest/:id/photo', { id: ParamValue<true> }, { id: ParamValue<false> }>,
    '/quest/[id]/photo/map': RouteRecordInfo<'/quest/[id]/photo/map', '/quest/:id/photo/map', { id: ParamValue<true> }, { id: ParamValue<false> }>,
    '/quest/[id]/photo/scan': RouteRecordInfo<'/quest/[id]/photo/scan', '/quest/:id/photo/scan', { id: ParamValue<true> }, { id: ParamValue<false> }>,
    '/quest/[id]/question/': RouteRecordInfo<'/quest/[id]/question/', '/quest/:id/question', { id: ParamValue<true> }, { id: ParamValue<false> }>,
    '/quest/test': RouteRecordInfo<'/quest/test', '/quest/test', Record<never, never>, Record<never, never>>,
  }
}
