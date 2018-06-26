"use strict"

export default function PathService() {
  return () => ({
    stripeUrl    : 'https://js.stripe.com/v3/',
    property     : '/api/property',
    application  : '/api/application',
    tenant       : '/api/tenant',
    administrator: '/api/administrator',
    setting      : '/api/setting',
    billing      : '/api/billing',
    help         : '/api/help',
  });
}
