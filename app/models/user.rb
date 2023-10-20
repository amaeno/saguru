class User < ApplicationRecord
    # ユーザIDをUUIDで設定
    include UuidGenerator

    # # 10文字以上20文字以下の半角英数記号のいずれかで構成される文字列のみ受付ける
    VALID_USERNAME_REGEX = /\A[a-zA-Z\d_!-~]{6,15}+\z/
    # 10文字以上20文字以下の半角英数記号を全て含んだ文字列のみ受付ける
    VALID_PASSWORD_REGEX = /\A(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)(?=.*?[\W_])[!-~]{10,20}+\z/
    validates :name, 
            presence: true,
            uniqueness: true,
            length: { in: 10..20 },
            format: { with: VALID_USERNAME_REGEX }

    validates :password,
            presence: true,
            length: { in: 10..20 },
            format: { with: VALID_PASSWORD_REGEX }

end