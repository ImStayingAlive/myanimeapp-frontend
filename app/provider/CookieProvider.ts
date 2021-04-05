import Cookies from "universal-cookie"
const cookies = new Cookies();

class CookieProvider {

    removeCookie(key: string) {
        cookies.remove(key, { path: '/' })
    }

    setCookie(key: string, value: string, age: number) {
        if(age) {
            cookies.set(key, value, {path: "/", maxAge: age})
        } else {
            cookies.set(key, value, {path: "/"})
        }
    }

    existsCookie(key: string) {
        let cookie = cookies.get(key);
        return !!cookie;
    }

    getCookie(key: string) {
        return cookies.get(key);
    }
}

const cookieProvider = new CookieProvider();
export default cookieProvider;