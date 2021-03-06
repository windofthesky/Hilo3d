#ifdef HILO_HAS_NORMAL
    #ifdef HILO_HAS_NORMAL_MAP
        vec3 T = normalize(u_normalMatrix * tangent.xyz);
        vec3 N = normalize(u_normalMatrix * normal);
        T = normalize(T - dot(T, N) * N);
        vec3 B = cross(T, N) * tangent.w;
        v_TBN = mat3(T, B, N);
    #endif
    v_normal = normalize(u_normalMatrix * normal);
#endif