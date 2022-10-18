class CreateOrderItems < ActiveRecord::Migration[7.0]
  def change
    create_table :order_items do |t|
      t.timestamps
    end
    add_reference :order_items, :order, foreign_key: true
    add_reference :order_items, :pizza, foreign_key: true
  end
end
