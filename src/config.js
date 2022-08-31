export default {
  "env": "prod",
  "local": {
    // 内网本地
    // 基础路径
    // "baseUrl": "http://188.155.32.103:9100",
    "baseUrl": "http://188.155.32.221:9100",
    // 头像路径
    "baseHeaderImgUrl": "http://188.185.101.58:80/photos/",
    // 图片路径
    "baseImgUrl": "http://188.185.101.83:20003",
    // 文件预览
    "wpsBaseUrl": "http://10.10.48.106:7101/web/reader?file=",
    // 中台固定参数
    "grant_type": "client_credentials",
    // 中台渠道参数
    "txBrNo": "BOP-2021031611200",
    "chnlCode": "C0000378-T",
    "client_secret": "ade3724ca4fb427aa56897d491ad3ac9",
    // 敏行平台app ID
    "app_id": "sxhb",
    // 敏行平台配置参数
    "clientId": "wdpt",
    "bearerToken": "Gwbb2pCj4j8XRWfgmW2wQmlojkKkQsJgUI7lkhbcaoQ6_3ge",
    // 中台公钥和密钥 私钥第二个
    "rsaPublicKey": "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAm9iqnkBnlY3YDatIrgVgdWScvqEygcZL/dVTwvSIielA0uhxU+72QBAyUS8LlATFXFFnnqeGxT+tF6mH2bGUI9rTyTPiZzETcmJ6ILmy28B154j80QOVN+ZLiFPqfFcKnv1eeX1m4qdwAVWOLjJtUR8/bjMRYLZSJ+6/Tffu2znZSXj1XJ5oviGKl3YuUgJZQQoi52ZmvL3V58DCezsOsDDZ7ZFORNEjb8RWlYs+SAyxGYMUehrCrimpZHtWg/8J7PwADBhSIntPj6sP1crFnE1szJcq0dzp8H8ZIcWGSnckggoz89znxXAANedjSHvVjX+LoWRvOsCe2IneWakIzQIDAQAB",
    "rsePrivateKey": "MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCSFp0WB4h3CDOyLAWnUkbofyCkAGh1lhpz99v8Wjn35VW2UclSiz0qi4SVg2D/hQamCIXNbzfBKEBXrY2DfP11G3a7Nd8kcYRbzdqSVro2VrJKDAMAtX+2IEeXerD+5n6yZm/ZrGQLSaSe+n2WajKw7LIHQ6OiZ/nJOF8GTjqIjn0ORKwmIwS44U8nNRnU4xw9/LrMAIvJpc566SU+pxmVGV5ZwmsskCH+GXtFpzx/oVVx58Lfbgn8xjSkaPUhl/Wv7sWf02BJVBh2l6LOPO3lypPVdwG+Nko1MFyVAzZ0pp5ORCoUmDrSQW2xwJiSjJMgJFNt+arwWNba4Sttk37vAgMBAAECggEAQhMsVaxukrgI+ctjezyBieMGFmeA175elJlEzKzajz8RN3digY0syzNzclSL6MZ4LVypeDOXmivkfkOnQBOmZ/NWDnLdTJRzczp2Y74KV017MnagXQ+6hduvxdneeEw0fehLKr8IOPrEFIvjhcbeypskIpj7SBeTKOnwQN/dJans5n48pVGXBJu98n/ZfkJIKQ4WSXOp9hcwQvMwhkuJ7Li1S8cvOQJMfUcN7ZfvHkJYEseh0GrGUef4YSH5PE6nllaH31tW0iuRKwURHtLCycgDKM1S0O6o/upXrnjx6YL+TiHay/oaRLGvFo1WsND1ow5F6ArphiGuabb7I5xxQQKBgQDYZvw+BtBuljD1yYOiNVBWs1iB44mXNNwnVZZiY78M3C4hHYdaFLGNvFC/WMtO8tHZPHaR8yrvI4spF/w84vB++jfN0anwRv1QCl+fOdGm6PQbfM03Mz8tP5eR4NIrZxA3vosxIijL7rWogniJmCmriHGoE+pNFNZ/ixT7ryWH3wKBgQCs0eKUeMa+OVOxa6suF5Yrt0FFrTgsgzqHDT/wN8gcQ/5yRpuG0qlZRih3fB7sRSroPYdCtqRuQMLgOAbb4EbOXFO3e4BImMyFGwjgFcsTVlsQr3AEWkcfDZPCoWSz6G0IrJEU4Om0gjJrhQUZM8UCm2mQBgVVuvCE/HYti4wq8QKBgQCaEhidALT9RylslSCHKHYehGoLcDjR0uy7hJAhVOr8+PZO1Xs8g2c2hlDnKwz1FKSbihTRLNPwltnJVC5eGyUnAncgrpnTXHeVuQ0DjGLb9xd1SpHBL1dXm+MKFYsNI7/EMIFhZfSt3TKw2tN/AzsHyYlCJYu3fZKKFDfISZbq+QKBgH3zPTG90AKE3zUX5hrif8R+eyiftKfkP/x7MJUO4l2PRFrekKyyzU9N7WIfaJ4DTuERLon1eGMN+bjVvFH040W0TiMT9At0qOF9MXu3BliigB3p7jaN4PWFvKGFZFIl24kN03Km9Exk8wAfYvbaHwPmZgncCXlQk8goAqzw3gfRAoGBAIoZUoUCRFUqme12+UxYt8iuiCbanbsHsgxQbr4FXZ9MALwqNVZ744ibWlP0bD30maK7DqsrpthNaKAiC7MX8o46eWiEhJv+zOQoJ5jsSY9ngZ7m9529PghaJ5LggpK664Y1QYLndUVOyCROsNL7BgQwTMq+7bsFQvqenPmzMOHC"
  },
  "prod": {
    // 生产环境
    "baseUrl": "http://39.1.195.27:20002",
    "baseHeaderImgUrl": "http://39.1.195.27:8090/photos/",
    "baseImgUrl": "http://39.1.195.27:18028/",
    "wpsBaseUrl": "http://39.1.195.27:7101/web/reader?file=",
    "grant_type": "client_credentials",
    "txBrNo": "BOP-2021031611200",
    "chnlCode": "C0000369",
    "client_secret": "8e14217dce814dac82284adc52a3c2d8",
    "app_id": "sxhb",
    "clientId": "wdpt",
    "bearerToken": "Gwbb2pCj4j8XRWfgmW2wQmlojkKkQsJgUI7lkhbcaoQ6_3ge",
    "rsaPublicKey": "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAgyJPtoVp6dMZ/t0+iwx22kNmQS7pD1W7SoPoN06b1kfDtvu82UjiYiy/4iIsrFJplznJk5gYBJ/mf1go/n6DVApz43MgQ26kSfSRtfTAbXz2MrVPKbIx1kOfNTkjZrcZwcqee4Ih3/g4JxDxPjNvot6xp2OtawbDOmtINXrOYIRGyqWXM3X0CPE/nIuigOi4ld906eY2twlLPpqJ+IJe53O7MbjrqSkg/fXQr+zRrm10hSv14DR19yUsJsE2pZ4XPU9Ll5Qgb0fEX+q6nCgYbn6a0y0IB6KXW09YjS21k0ROU1HiofPbzapmKTHpTQ+VoQ5Ff+sD9sHzLhI+Z59HwwIDAQAB",
    "rsePrivateKey": "MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCCH5o98ivea3pp482whPj7YUc0ZVole1J7xs0LapIJUIi1T5c1MPOmEu8u3vHYkP+zx0Tb549/jw5JcEQg7/jjS7wwtcIC4nCXMAjPmNPWD1A++uAEtrzE+8nc9HJ3B9pBrbjk+d5xQDZtvUnMbXuEHagcmXiFdogIGcsCSfo/afD3mr248mOiEaNr313GVbt/JebT514SS9XLcBmS29oEDA7EYNeuUy9qVRe9xMzzYs/rjMNTTiVsVOg97EcWCKc3iB6MTaS5h7Hukf6hKNrMMc7z9E8WT8r+yK6gtTfYvouEhD0tlIQcOUlRl3lxCF7dKR1VuPMu+j4z1zx7gQDzAgMBAAECggEAQz+t6UHVJjgJpdwTm5y9SL13nT6cHi7j7BBMPBAxtRqn7HxbuyO3aCb08hZKixA09maP0c6UvOnkClQ5AYTD7kRf2BS3VeJNKfWrOA7VvBVh9YqWaBlA6dTu+IBk/9tREwyDN+Ni8Mis2H4xO7OBWEAzd8RhIyilGPqrjl1JNaf//DLGkcYOZ5isYgRpPMwNZiw1LXAZX4/nLP29CDQOtMKQnR8zP3DrUy7EjemNTV9d2wrXbvf4W+BwIk+H0WaGPIBs1Xux39HRE0JVUWMYghLotgBk0eTK+7bRLcNutkJ5mpPLya91Ui4T2xQ2Rp4IEgGcPwTeRd2gkWVsgUETQQKBgQC/04KCyZ/E6acLPezylMpEryX72Use8jlAakvVOFz4gL76LUK8N+cj9NFxq9FJX9hygq8+q+LrYcI2RruGmQTWca1wjs14qnDRm+6yCI9vQlxmYDOdFQ8DyZpaJxOtINXFeZ4zI46N5FzgMFyGFRLs1EF2NrPnJ8wJmxBdQDtRsQKBgQCtp7WWpKwQTy5yELSVDrTSW2h8Bo7U/nlLnmMm6CFRN/NDHyNs77OSIduwnctXBUm7ZtWbzIjgIPhHX2RQUOMLoRXpXnhFXiqv+MJIrtkL9lhbnYZapM19/n2UZiA+7QzjZB8WKqaRe9hQVG4E+pr7fW0dlduxeVOtIQXk2Yvh4wKBgBI7czslGMdpgdQCtcO0uqjekNioJYiycxiZQc3pRoTkD8LNjHtBQPnc6g9IymKT9omjvC5TvgSrTP9Fp8s6Pgh304lQOV1PrdtuW7iWMbPcddXRLPawKrYscjxBXJBm/4p+bbfkmEcKPn2cex7PX/YckoA+4MiGstDy6RJD6Z9xAoGAbK8PJoZPrjFwdzFfY/79Sr6s6RrNoB7YWWx6z+numD91P6goatCmyanpLmPD1OXZXLGitUzQyb24xiq8xMurHicmaJWYnomuG86MAiN0clkuucAgS3Djr5xsiklUmy2PqG2MSzpMX7dsDfKZnQIfp5C7jw2wnyW5Kh0F7FH/i1MCgYEAglvp4mcouZzNaf+X8iE770J5qzWAr4dprwIXTDiyWodTFjBEX6IIv//5onLHGeeDXqePactS2vuXCik6YW73ytPdJu0+EWShLMwBZhCRRV5xsAPKtrqYW8gmcnnnM1Cakk0293iJezipgbU9RMJqZUXpESQBaGDQlQZrlW6dse0="
  },
  "dev": {
    // 测试环境
    "baseUrl": "http://10.10.48.106:20002",
    "baseHeaderImgUrl": "http://10.10.48.106:8090/photos/",
    "wpsBaseUrl": "http://10.10.48.106:7101/web/reader?file=",
    "baseImgUrl": "http://10.10.48.106:9084/",
    "grant_type": "client_credentials",
    "txBrNo": "BOP-2021031611200",
    "chnlCode": "C0000378-T",
    "client_secret": "ade3724ca4fb427aa56897d491ad3ac9",
    "app_id": "sxhb",
    "clientId": "wdpt",
    "bearerToken": "Gwbb2pCj4j8XRWfgmW2wQmlojkKkQsJgUI7lkhbcaoQ6_3ge",
    "rsaPublicKey": "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAm9iqnkBnlY3YDatIrgVgdWScvqEygcZL/dVTwvSIielA0uhxU+72QBAyUS8LlATFXFFnnqeGxT+tF6mH2bGUI9rTyTPiZzETcmJ6ILmy28B154j80QOVN+ZLiFPqfFcKnv1eeX1m4qdwAVWOLjJtUR8/bjMRYLZSJ+6/Tffu2znZSXj1XJ5oviGKl3YuUgJZQQoi52ZmvL3V58DCezsOsDDZ7ZFORNEjb8RWlYs+SAyxGYMUehrCrimpZHtWg/8J7PwADBhSIntPj6sP1crFnE1szJcq0dzp8H8ZIcWGSnckggoz89znxXAANedjSHvVjX+LoWRvOsCe2IneWakIzQIDAQAB",
    "rsePrivateKey": "MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCSFp0WB4h3CDOyLAWnUkbofyCkAGh1lhpz99v8Wjn35VW2UclSiz0qi4SVg2D/hQamCIXNbzfBKEBXrY2DfP11G3a7Nd8kcYRbzdqSVro2VrJKDAMAtX+2IEeXerD+5n6yZm/ZrGQLSaSe+n2WajKw7LIHQ6OiZ/nJOF8GTjqIjn0ORKwmIwS44U8nNRnU4xw9/LrMAIvJpc566SU+pxmVGV5ZwmsskCH+GXtFpzx/oVVx58Lfbgn8xjSkaPUhl/Wv7sWf02BJVBh2l6LOPO3lypPVdwG+Nko1MFyVAzZ0pp5ORCoUmDrSQW2xwJiSjJMgJFNt+arwWNba4Sttk37vAgMBAAECggEAQhMsVaxukrgI+ctjezyBieMGFmeA175elJlEzKzajz8RN3digY0syzNzclSL6MZ4LVypeDOXmivkfkOnQBOmZ/NWDnLdTJRzczp2Y74KV017MnagXQ+6hduvxdneeEw0fehLKr8IOPrEFIvjhcbeypskIpj7SBeTKOnwQN/dJans5n48pVGXBJu98n/ZfkJIKQ4WSXOp9hcwQvMwhkuJ7Li1S8cvOQJMfUcN7ZfvHkJYEseh0GrGUef4YSH5PE6nllaH31tW0iuRKwURHtLCycgDKM1S0O6o/upXrnjx6YL+TiHay/oaRLGvFo1WsND1ow5F6ArphiGuabb7I5xxQQKBgQDYZvw+BtBuljD1yYOiNVBWs1iB44mXNNwnVZZiY78M3C4hHYdaFLGNvFC/WMtO8tHZPHaR8yrvI4spF/w84vB++jfN0anwRv1QCl+fOdGm6PQbfM03Mz8tP5eR4NIrZxA3vosxIijL7rWogniJmCmriHGoE+pNFNZ/ixT7ryWH3wKBgQCs0eKUeMa+OVOxa6suF5Yrt0FFrTgsgzqHDT/wN8gcQ/5yRpuG0qlZRih3fB7sRSroPYdCtqRuQMLgOAbb4EbOXFO3e4BImMyFGwjgFcsTVlsQr3AEWkcfDZPCoWSz6G0IrJEU4Om0gjJrhQUZM8UCm2mQBgVVuvCE/HYti4wq8QKBgQCaEhidALT9RylslSCHKHYehGoLcDjR0uy7hJAhVOr8+PZO1Xs8g2c2hlDnKwz1FKSbihTRLNPwltnJVC5eGyUnAncgrpnTXHeVuQ0DjGLb9xd1SpHBL1dXm+MKFYsNI7/EMIFhZfSt3TKw2tN/AzsHyYlCJYu3fZKKFDfISZbq+QKBgH3zPTG90AKE3zUX5hrif8R+eyiftKfkP/x7MJUO4l2PRFrekKyyzU9N7WIfaJ4DTuERLon1eGMN+bjVvFH040W0TiMT9At0qOF9MXu3BliigB3p7jaN4PWFvKGFZFIl24kN03Km9Exk8wAfYvbaHwPmZgncCXlQk8goAqzw3gfRAoGBAIoZUoUCRFUqme12+UxYt8iuiCbanbsHsgxQbr4FXZ9MALwqNVZ744ibWlP0bD30maK7DqsrpthNaKAiC7MX8o46eWiEhJv+zOQoJ5jsSY9ngZ7m9529PghaJ5LggpK664Y1QYLndUVOyCROsNL7BgQwTMq+7bsFQvqenPmzMOHC"
  },
  "uat": {
    // 准生产环境
    "baseUrl": "http://10.10.48.106:21002",
    "baseHeaderImgUrl": "http://10.10.48.106:8090/photos/",
    "wpsBaseUrl": "http://10.10.48.106:7101/web/reader?file=",
    "baseImgUrl": "http://10.10.48.106:9084",
    "grant_type": "client_credentials",
    "txBrNo": "BOP-2021031611200",
    "chnlCode": "C0000369-T",
    "client_secret": "85db00590c24459e84ebd55403048cde",
    "app_id": "sxhb",
    "clientId": "wdpt",
    "bearerToken": "Gwbb2pCj4j8XRWfgmW2wQmlojkKkQsJgUI7lkhbcaoQ6_3ge",
    "rsaPublicKey": "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAm9iqnkBnlY3YDatIrgVgdWScvqEygcZL/dVTwvSIielA0uhxU+72QBAyUS8LlATFXFFnnqeGxT+tF6mH2bGUI9rTyTPiZzETcmJ6ILmy28B154j80QOVN+ZLiFPqfFcKnv1eeX1m4qdwAVWOLjJtUR8/bjMRYLZSJ+6/Tffu2znZSXj1XJ5oviGKl3YuUgJZQQoi52ZmvL3V58DCezsOsDDZ7ZFORNEjb8RWlYs+SAyxGYMUehrCrimpZHtWg/8J7PwADBhSIntPj6sP1crFnE1szJcq0dzp8H8ZIcWGSnckggoz89znxXAANedjSHvVjX+LoWRvOsCe2IneWakIzQIDAQAB",
    "rsePrivateKey": "MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDK32S6ZAnQDmjVtwNetKduWV07d2+99RPe2w+jjgqZTYgMfCjZXlHEGxwycuAYeKyZgPmIpyaE6h/5ZNlnHJQ1MShqOp4Cwsv5YmLhONMPTfC7pbEFQSwIC7ESlyyd72SSk2+hby4mNQ9A6V+n/RnwrJ0i0VRahjNSYm0vthDNbbSr/IO9ElX3RWMZ8BnTKIYx9Cf5XYvNcmi7xvwRN/GZMjBXNBqmxWOCAqoWOOMxm5RGXyeSNgpGvt7tGYz6bx0/wt6EPgFhtMKKXVWhvOUdq2kmeJPyiwJKeYmjN0Bro3hTtdZ0ntiAMpg9iCszmpPauc/jkXKz+aZYlfigwx5HAgMBAAECggEBAKRRUKrPwErugOcpNueMd1iftS4nTTCUwqVs1TvqHpeQ/rLuFcAJ7zxhoPMTrILlqxciKfsPN9nMMF2124jy0vBKgquYEse1s7SoheJaPklVHbk/OSRCZ0GVBrVCEPdTISi/llkxTjXQICy5WasdC9euWBANcL9pl0QRSNKuKunXkWzDGE5oARbO1iBLEoY5m9cFlEDNjSiGWRPBKLGyq7HolNgAimA7i9bWQlUvGvt8bY/xdiV/0pLAhgC4cHLxDUHeg1FTlRWIjBQtNy353RJ6fAroU+9LCu17MI/pm2upagbBzSaOrCBV3RmD2SjBdyeo/Jg7p95Aa7VvkcnsejECgYEA9y8Q2rXP3SnnEEjTD6PgqgPdMvwIkM49a5AXzqlb8gtD2OKRa+Y+FndQovJw4FZ/LLq43j80YcK/tTPqrq8iy70Rgk41CqlAG0pxkJyrUOSzcldTXvHcOSEDVP+bMdEB+geezGk/KZ6NClHTkDWuoNzUUX9KuA5fmR2ob6llB50CgYEA0hu9dolsbppiCFHOlGhN0hZ9c/1LWEcY0QXdAqmdkPADqgIbuzNbp6iyd0fPTWSjgNf/fy4JHSVK2ONyhBLTjm1AiBbJ/woHcJDtSXwWqq9ly1v8iamjMN4LGi+aV+dCi4UzmZEqrZWGWqOLFBjoGeB3rdJ5ccQqtGpgmXFy4jMCgYB8iG/bYKIa8NOC9s2vIYc84Ll+yE+gdOeo223DJrw2E8rY6D0PuW4qb25myfJoc+uao3AkOH+xiSaAqmlgHMhRES5TEgfTGTY9CaJxkx0UokRuJOTR/tROy/0bw7Nyw7RVPaWZoqS52TGBs3v9Oa6DSP6HGLSSSluLjs+fgh5uWQKBgApD9LPP7w5QWK3TYWZ62iKDmsmJ/J5pitrbkHrK0rn8IBG0XKp+zeGZKm8NgSFk42AuLXuHQka8RbXnFvdA/DkfOWHsyx283bQwQIewmmLogu62pdYMBb8jeiNjZAUbdXLfpS/BmfY1MgVHrEnlFaH+B5rkh655SSTbdbDJjDVlAoGAN7YbYULO4JIlNC2MKx91WxywM+RWz8XT9A/30/wAhdrwGurdLUWkbkP2RkgKkJcD3yScGSIvthqcNIIJjpBQs4A4Jh7E8bgXBlmXuVOV7qPyAvrScE4P67lKIhqjpw990DJLOaDGLqA/PUdu2SH0VNJtcxYyGAuQMtErO3S3JwY="
  }
}