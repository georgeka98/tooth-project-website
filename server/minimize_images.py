from PIL import Image
import os

# Define the base directory
base_dir = '/Users/georgeka/Desktop/uni/tooth project internship/tooth-project-website/server/cbct_slices/1000813648_20180116'

# Define the folders to be processed
folders = ['front', 'side', 'top']

for folder in folders:
    folder_path = os.path.join(base_dir, folder)
    output_folder_path = os.path.join(base_dir, f'{folder}_opt')

    # Create the output folder if it doesn't exist
    os.makedirs(output_folder_path, exist_ok=True)

    # Process each image in the folder
    for image_name in os.listdir(folder_path):
        if image_name.endswith(('.jpg', '.jpeg', '.png')):
            image_path = os.path.join(folder_path, image_name)
            output_image_path = os.path.join(output_folder_path, os.path.splitext(image_name)[0] + '.webp')

            # Open the image
            img = Image.open(image_path)

            # Downsize the image with an ANTIALIAS filter
            img = img.resize((img.size[0] // 2, img.size[1] // 2), Image.LANCZOS)

            # Save the downsized image as a .webp file
            img.save(output_image_path, format='WEBP', optimize=True, quality=15, subsampling=0)

            print(f"Image saved to: {output_image_path}")
