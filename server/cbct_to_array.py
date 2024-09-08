import sys
import numpy as np 
import torch.nn.functional as F
import matplotlib.pyplot as plt
import torchio as tio 
import os

def visualize_2d_array(array, label, idx, view, output_dir="output_images", cmapVal="gray"):

    # Rotate the 2D slice 90 degrees to the right
    array_2d_rotated = np.rot90(array, k=1)  # k=-1 means 90 degrees clockwise

    # se the maximum value to 700
    array_2d_rotated[array_2d_rotated > 1300] = 1300

    # array_2d_rotated[array_2d_rotated > np.percentile(array_2d_rotated, 99.75)] = np.percentile(array_2d_rotated, 99.75)

    plt.imshow(array_2d_rotated, cmap=cmapVal)

    if label is not None:
        label_rotated = np.rot90(label, k=1)  # k=1 means 90 degrees clockwise

        # Create a mask for non-zero values in the label
        mask = label_rotated > 0

        # Overlay only the non-zero values from the label
        plt.imshow(np.ma.masked_where(~mask, label_rotated), cmap='jet', alpha=0.5)

        # if(idx==600):
        #     print(array_2d_rotated)
        #     # output array in a text file
        #     np.savetxt("array.txt", array_2d_rotated, fmt="%d")
        #     plt.show()

    plt.axis('off')  # Turn off axis ticks and labels
    
    # Save the plot as an image file
    image_path = os.path.join(output_dir, f'{view}_view_{idx:03d}.jpg')
    plt.savefig(image_path, bbox_inches='tight', pad_inches=0, transparent=True)


    # Close the plot to free memory
    plt.close()

    return

    # plt.title('Skeletonized Image')
    # plt.colorbar()  # Add color bar to show pixel intensity values
    # plt.show()

def cbct_to_array(img_path, lab_path, file, target_spacing=(0.2, 0.2, 0.2)):

    # Check if the folder exists and return early if it does
    output_dir = os.path.join('cbct_slices', file)
    if os.path.exists(output_dir):
        # print(f"Folder already exists, no need to create it: {output_dir}. Deleting...")
        # os.system(f"rm -rf {output_dir}")
        return output_dir

    # Create folder and subfolders
    os.makedirs(output_dir, exist_ok=True)
    for view in ['front', 'side', 'top']:
        os.makedirs(os.path.join(output_dir, view), exist_ok=True)

    tio_img = tio.ScalarImage(img_path)

    # spacing gets the distance between each voxel (3D pixel) in mm

    # enlarging the CBCT image by reducing the spacing betwen each voxel to 0.2 mm 
    img_spacing = np.array(tio_img.spacing)
    img_size = np.array(tio_img.data.shape[1:])
    target_size = img_size * img_spacing / target_spacing

    # print(tio_img.data.shape[1:], target_size)

    target_size_int = tuple(int(size) for size in target_size.astype(int))
    target_img = F.interpolate(input=tio_img.data.unsqueeze(0).float(), size=target_size_int, mode='trilinear').squeeze()
    target_lab = None

    if lab_path is not None:
        lab_img = tio.LabelMap(lab_path)
        # print(lab_img.data.shape)
        target_lab = F.interpolate(lab_img.data.unsqueeze(0).float(), size=target_size_int, mode='nearest').squeeze()
        target_lab = target_lab.numpy()

    # getting side view slices
    for i in range(0, target_img.shape[0]):
        # print(i)
        visualize_2d_array(target_img[i],  target_lab[i], i, "side", output_dir+"/side")

    # getting front view slices
    for i in range(0, target_img.shape[1]):
        # print(i)            
        visualize_2d_array(target_img[:, i], target_lab[:, i], i, "front", output_dir+"/front")

    # getting top view slices
    for i in range(0, target_img.shape[2]):
        # print(i)
        visualize_2d_array(target_img[:, :, i], target_lab[:, :, i], i, "top", output_dir+"/top")

    return output_dir

    # visualize_2d_array(target_img[300])



if __name__ == "__main__":

    file = sys.argv[1]

# /Users/georgeka/Desktop/uni/tooth project internship/tooth-project-website/server/data/
    img_path = '/Volumes/Georges NVME 2/cbct/'+file+'.nii.gz'
    lab_path = '/Volumes/Georges NVME 2/labels/'+file+'.nii.gz'

    result = cbct_to_array(img_path, lab_path, file)
    # save the output in a text file
    print(result)



    

# file = "1000813648_20180116"

# img_path = '/Users/georgeka/Desktop/uni/tooth project internship/tooth-project-website/server/data/cbct/'+file+'.nii.gz'
# lab_path = '/Users/georgeka/Desktop/uni/tooth project internship/tooth-project-website/server/data/labels/'+file+'.nii.gz'
# # 'server/data/cbct/'+file+'.nii.gz'
# result = cbct_to_array(img_path, lab_path, file)