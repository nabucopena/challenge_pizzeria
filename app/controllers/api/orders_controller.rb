module Api
  class OrdersController < ApplicationController
    def index
      render json: Order.all
    end

    def new
      @order = Order.new
      @order.order_items.build

      respond_to do |format|
        format.html # new.html.erb
        format.json { render json: @order }
      end
    end

    def create
      @order = Order.new()
      @order.order_items_attributes = params[:order][:order_items_attributes].map{|x| JSON.parse(x)}
      if @order.save
       render json: @order 
      else
        render status: 401
      end
    end

    def show
      render json: OrderItem.joins(:pizza).select(:name).where(:order_id => params[:id]).map{|x| x[:name]}
    end
  end
end
