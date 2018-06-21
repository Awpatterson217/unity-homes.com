"use strict"

export default function PathService() {
  return () => ({
    property     : '/api/property',
    application  : '/api/application',
    tenant       : '/api/tenant',
    administrator: '/api/administrator',
    setting      : '/api/setting',
    billing      : '/api/billing',
    help         : '/api/help',
  });
}
