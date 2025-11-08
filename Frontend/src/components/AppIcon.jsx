// import React from 'react';
// import * as LucideIcons from 'lucide-react';
// import { HelpCircle } from 'lucide-react';

// function Icon({
//     name,
//     size = 24,
//     color = "currentColor",
//     className = "",
//     strokeWidth = 2,
//     ...props
// }) {
//     const IconComponent = LucideIcons?.[name];

//     if (!IconComponent) {
//         return <HelpCircle size={size} color="gray" strokeWidth={strokeWidth} className={className} {...props} />;
//     }

//     return <IconComponent
//         size={size}
//         color={color}
//         strokeWidth={strokeWidth}
//         className={className}
//         {...props}
//     />;
// }
// export default Icon;




import React, { useState } from 'react';
import * as LucideIcons from 'lucide-react';
import { HelpCircle } from 'lucide-react';

function Icon({
    name,
    size = 24,
    color = "currentColor",
    className = "",
    strokeWidth = 2,
    src, // New prop for image source
    alt = "icon", // New prop for image alt text
    ...props
}) {
    const [imgError, setImgError] = useState(false);
    
    // Check if it's an image request (starts with 'image:' or has src prop)
    const isImage = name?.startsWith('image:') || src;
    
    if (isImage && !imgError) {
        // Extract image name if using the 'image:' prefix
        const imageName = name?.replace('image:', '');
        
        try {
            // For Vite, use dynamic imports with public folder or direct paths
            let imageSrc = src;
            
            if (!src && imageName) {
                // Try to construct the path - adjust this based on your project structure
                imageSrc = `/images/${imageName}.jpg`;
            }
            
            return (
                <img
                    src={imageSrc}
                    alt={alt}
                    className={`object-contain ${className}`}
                    style={{
                        width: size,
                        height: size,
                    }}
                    onError={() => setImgError(true)}
                    {...props}
                />
            );
        } catch (error) {
            console.error('Error loading image:', error);
            setImgError(true);
        }
    }

    const IconComponent = LucideIcons?.[name];

    if (!IconComponent) {
        return <HelpCircle size={size} color="gray" strokeWidth={strokeWidth} className={className} {...props} />;
    }

    return <IconComponent
        size={size}
        color={color}
        strokeWidth={strokeWidth}
        className={className}
        {...props}
    />;
}

export default Icon;