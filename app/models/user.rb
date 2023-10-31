class User < ApplicationRecord
        # アソシエーション
        has_many :episodes, dependent: :destroy
        has_many :analysis_q1, dependent: :destroy
        has_many :analysis_q2, dependent: :destroy
        has_many :summaries, dependent: :destroy


        # ユーザIDをUUIDで設定
        include UuidGenerator

        # バリデーション
        # 6文字以上15文字以下の半角英数記号のいずれかで構成される文字列のみ受付ける
        VALID_USERNAME_REGEX = /\A[a-zA-Z\d_!-~]+\z/
        # 10文字以上20文字以下の半角英数記号を全て含んだ文字列のみ受付ける
        VALID_PASSWORD_REGEX = /\A(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)(?=.*?[\W_])[!-~]+\z/
        validates :name, 
                presence: true,
                uniqueness: true,
                length: { in: 6..15 },
                format: { with: VALID_USERNAME_REGEX }

        validates :password,
                presence: true,
                length: { in: 10..20 },
                format: { with: VALID_PASSWORD_REGEX }
end