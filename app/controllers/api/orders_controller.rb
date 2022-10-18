module Api
  class OrdersController < ApplicationController
    def index
      render json: Order.all
    end

    def create
      @order = Order.new(params)
      if @order.save
       render status: 200
      else
        render status: 401
      end
    end

    def show
      render json: OrderItems.where(:order_id == params[:id])
    end
  end
end
