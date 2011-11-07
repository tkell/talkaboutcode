class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.string :title
      t.text :code_snippet
      t.string :audio_url
      t.references :user

      t.timestamps
    end
    add_index :posts, :user_id
  end
end
