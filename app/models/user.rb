class User < ApplicationRecord
    # ユーザIDをUUIDで設定
    include UuidGenerator
end