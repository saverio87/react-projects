'use strict';

const { default: createStrapi } = require('strapi');

const stripe = require('stripe')('sk_test_51HsN3sFMtCtUyke91n1uKVExqa17tnncIAmkwlBhYWTML8cj52yOszOW6cApmV6Ehzibg6o4A1uTgYJkjs1OkIuQ000mA9n44t');

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  create: async ctx => {
    const {name,total,items,stripeTokenId} = ctx.request.body;
    const {id} = ctx.state.user;

    const charge = await stripe.charges.create({
      amount:Math.round(total*100),
      currency:"usd",
      source:stripeTokenId,
      description: `Order ${new Date()} by ${ctx.state.user.username}`
    });

    const order = await strapi.services.order.create({
      name,total,items,user:id,
    })

    return order;
  }
};
