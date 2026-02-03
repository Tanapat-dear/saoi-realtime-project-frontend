import axios from 'axios';

export function manpower_layoutloader() {
    try{
        const layoutPromise = axios.get(`${import.meta.env.VITE_API_URL}weblayout`)
            .then(res => res.data);

       return {
        data: layoutPromise,
       }
    }
    catch (error) {
        console.log(error);
        throw new Response('Failed to load manpower layout data', { status: 500 });
    }
    
}

export function machine_layoutloader() {
    try{
        const layoutPromise = axios.get(`${import.meta.env.VITE_API_URL}weblayout`)
            .then(res => res.data);

       return {
        data: layoutPromise,
       }
    }
    catch (error) {
        console.log(error);
        throw new Response('Failed to load manpower layout data', { status: 500 });
    }
    
}

export function settingpage_loader() {
    try {
        const authPromise = axios.get(`${import.meta.env.VITE_API_URL}auth/profile`, {
            withCredentials: true // ต้องใส่เพื่อให้ Browser ส่ง Cookie ไปหา NestJS จ้ะ
        })
        .then(res => res.data)
        .catch(err => {
            // 🛠️ ถ้า Error เป็น 401 ให้คืนค่า Guest Object ตามที่คุณต้องการ
            if (err.response && err.response.status === 401) {
                return {
                    isAuthen: false,
                    user: {
                        username: '',
                        role: ''
                    }
                };
            }
            // ถ้าเป็น Error อื่นๆ ให้โยน Error ออกไปเพื่อให้ Catch ด้านล่างทำงานจ้ะ
            throw err;
        });

        return {
            auth: authPromise
        };
    }
    catch (error) {
        console.log(error);
        throw new Response('Failed to authorize data', { status: 500 });
    }
}



export function initial_loader() {

  const authPromise = axios.get(`${import.meta.env.VITE_API_URL}auth/profile`, {
    withCredentials: true
  })
  .then(res => res.data)
  .catch(error => {

    console.error("Authorization Failed:", error.response?.status);
    return {
      isAuthen: false,
      user: {
        username: '',
        role: '',
      }
    };
  });

  return {
    auth: authPromise
  };
}


export function planeditor_loader(){
     try{
        const planPromise = axios.get(`${import.meta.env.VITE_API_URL}planeditor`)
            .then(res => res.data);

       return {
        plandata: planPromise,
       }
    }
    catch (error) {
        console.log(error);
        throw new Response('Failed to load plan data', { status: 500 });
    }
}