# Adding Images to EASELIFE

## Image Requirements

To make the website more visual and accessible for less educated users, you can add images related to:
- Work and labor empowerment
- Different service types (labour, tailoring, electrician, etc.)
- Success stories
- Service provider profiles

## Where to Add Images

### 1. Hero Section Images
Add images to `client/public/hero/`:
- `labor-empowerment.jpg` - Labor empowerment image
- `service-providers.jpg` - Service providers working
- `success-story.jpg` - Success stories

### 2. Service Type Icons
Currently using emojis, but you can replace with images in:
- `client/public/icons/` - Service type icons
- Update `Hero.js` to use image components instead of emojis

### 3. Service Provider Images
Service providers can upload their profile images:
- Store in `server/uploads/providers/`
- Update `ServiceProvider` model to include image URLs
- Add image upload functionality using multer

## Implementation Steps

### Step 1: Create Public Directories
```bash
mkdir -p client/public/hero
mkdir -p client/public/icons
mkdir -p server/uploads/providers
```

### Step 2: Add Images
Place your images in the appropriate directories.

### Step 3: Update Components

**Hero Component:**
```jsx
import Image from 'next/image';

// In Hero.js
<Image 
  src="/hero/labor-empowerment.jpg" 
  alt="Labor Empowerment"
  width={800}
  height={400}
/>
```

**Service Card:**
```jsx
// In ServiceCard.js
{provider.images && provider.images.length > 0 && (
  <Image 
    src={provider.images[0]} 
    alt={provider.name}
    width={300}
    height={200}
  />
)}
```

### Step 4: Image Upload (Backend)

Add multer configuration in `server/index.js`:
```javascript
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/providers/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });
```

## Recommended Image Sizes

- Hero images: 1920x1080px
- Service icons: 128x128px
- Provider profile: 400x400px
- Service cards: 600x400px

## Image Optimization

Use Next.js Image component for automatic optimization:
- Lazy loading
- Responsive images
- WebP format support
- Size optimization

## Free Image Resources

For placeholder images, you can use:
- Unsplash (https://unsplash.com)
- Pexels (https://pexels.com)
- Pixabay (https://pixabay.com)

Search for:
- "labor work"
- "service provider"
- "skilled worker"
- "empowerment"

---

**Note**: Currently, the website uses emojis and icons. To add actual images, follow the steps above.

