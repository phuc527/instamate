import { useEffect, useState } from "react";
import { getChannelAppsApi } from "src/api/channelApp/channelApp";
import { ChannelApp } from "src/types/api/app";
import { CommonPagination } from "src/types/api/common";

const useFetchChannelApp = (): [
    CommonPagination<ChannelApp> | null,
    boolean,
    unknown
] => {
    const [data, setData] = useState<CommonPagination<ChannelApp> | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<unknown>();

    useEffect(() => {
        setLoading(true);
        getChannelAppsApi()
            .then((r) => setData(r))
            .catch((e) => {
                setError(e);
            })
            .finally(() => setLoading(false));
    }, []);

    return [data, loading, error];
};

export default useFetchChannelApp;
