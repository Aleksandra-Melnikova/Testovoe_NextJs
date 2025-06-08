export const ReviewSkeleton = () => (
    <div
        className="col-md-6 col-lg-4 mb-4 card mx-3 h-100 p-4 flex-column justify-content-start rounded-2"
        style={{
            width: '321px',
            minHeight: '300px',
            backgroundColor: 'var(--bs-secondary)',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
        }}
    >
        <div
            className="skeleton mb-3"
            style={{
                width: '100px',
                height: '24px',
                backgroundColor: '#e9ecef',
                borderRadius: '4px'
            }}
        />
        <div
            className="skeleton mb-2"
            style={{
                width: '100%',
                height: '16px',
                backgroundColor: '#e9ecef',
                borderRadius: '4px'
            }}
        />
        <div
            className="skeleton mb-2"
            style={{
                width: '90%',
                height: '16px',
                backgroundColor: '#e9ecef',
                borderRadius: '4px'
            }}
        />
        <div
            className="skeleton mb-2"
            style={{
                width: '80%',
                height: '16px',
                backgroundColor: '#e9ecef',
                borderRadius: '4px'
            }}
        />
        <div
            className="skeleton"
            style={{
                width: '70%',
                height: '16px',
                backgroundColor: '#e9ecef',
                borderRadius: '4px'
            }}
        />
    </div>
);
