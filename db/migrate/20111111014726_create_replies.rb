class CreateReplies < ActiveRecord::Migration
  def change
    create_table :replies do |t|
      t.string :audio_url
      t.references :post
      t.references :user

      t.timestamps
    end
    add_index :replies, :post_id
    add_index :replies, :user_id
  end
end
