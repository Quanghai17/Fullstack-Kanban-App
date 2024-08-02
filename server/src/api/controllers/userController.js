const User = require('../models/user')
const CryptoJS = require('crypto-js')
const jsonwebtoken = require('jsonwebtoken')

exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Kiểm tra xem username đã tồn tại hay chưa
        const user = await User.findOne({ username });

        console.log("user", user);

        if (user) {
            return res.status(400).json({
                message: "Tài khoản đã được đăng kí",
                error: true,
            });
        }

        // Mã hóa mật khẩu
        const encryptedPassword = CryptoJS.AES.encrypt(
            password,
            process.env.PASSWORD_SECRET_KEY
        ).toString();

        // Tạo người dùng mới
        const userData = new User({
            username,
            password: encryptedPassword,
        });

        await userData.save();

        // Tạo token
        const token = jsonwebtoken.sign(
            { id: userData._id },
            process.env.TOKEN_SECRET_KEY,
            { expiresIn: '24h' }
            
        );

        res.status(201).json({
            data: userData,
            token: token,
            success: true,
            error: false,
            message: "Đăng kí tài khoản thành công!",
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Đăng kí tài khoản không thành công!",
            error: true,
        });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body
    try {
        const user = await User.findOne({ username }).select('password username')
        if (!user) {
            return res.status(401).json({
                message: "Đăng nhập không thành công",
                errors: [
                    {
                        param: 'username',
                        msg: 'Invalid username or password'
                    }
                ]
            })
        }

        const decryptedPass = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASSWORD_SECRET_KEY
        ).toString(CryptoJS.enc.Utf8)

        if (decryptedPass !== password) {
            return res.status(401).json({
                message: "Sai mật khẩu",
                errors: [
                    {
                        param: 'username',
                        msg: 'Invalid username or password'
                    }
                ]
            })
        }

        user.password = undefined

        const token = jsonwebtoken.sign(
            { id: user._id },
            process.env.TOKEN_SECRET_KEY,
            { expiresIn: '24h' }
        )

        res.status(200).json({
            message: "Đăng nhập thành công",
            data: user,
            token: token,
            success: true,
            error: false
        })

    } catch (err) {
        res.status(500).json(err)
    }
}

