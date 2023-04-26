
import { v4 as uuidv4 } from 'uuid';

const QueueLane = () => {
    return {
        key: uuidv4(),
        hostname: '',
        items: [],
        maxSimultaneous: 3,
        frequency: 1 // seconds

    }
}

const QueueItem = () => {
    return {
        key: uuidv4(),
        url: '',
        retries: 2,
        fallback_url: '',
        status: "Pending",
        data: null,
        headers: {},
        method: "GET",
        credentials: false,
        expires: -1,
        isImage: null // hidden image with onload set to fire the callback with the image as argument... otherwise it's data and calls the callback
    }
}

const QueueFactory = { QueueItem, QueueLane };

export default QueueFactory;