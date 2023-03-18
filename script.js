function createNode(data, left, right) {
	return {
		data: data,
		left: left,
		right: right,
	};
}

class Tree {
	root;
	constructor(array, root) {
		root = this.buildTree(array);
		this.root = root;
	}

	buildTree(arr) {
		const sortedArray = mergeSort(arr);
		let start = 0;
		let end = sortedArray.length - 1;
		//If there is no other nodes to left or right of array left / right gets set to null.
		if (start > end) {
			return null;
		}
		let mid = Math.floor((start + end) / 2);
		let leftArray = sortedArray.slice(start, mid);
		let rightArray = sortedArray.slice(mid + 1, end + 1);
		//Creates new root node.
		let rootNode = new createNode(sortedArray[mid]);
		//sets left / right properties to correct node recusively
		rootNode.left = this.buildTree(leftArray);
		rootNode.right = this.buildTree(rightArray);

		return rootNode;
	}

	insert(val, nodeValue = this.root) {
		let value = val;
		let newNode = new createNode(value, null, null);

		if (nodeValue == null) {
			return this.root;
		}
		if (value < nodeValue.data) {
			// nodeValue = nodeValue.left;
			if (nodeValue.left == null) {
				nodeValue.left = newNode;
			}
			this.insert(value, (nodeValue = nodeValue.left));
		}
		if (value > nodeValue.data) {
			if (nodeValue.right == null) {
				nodeValue.right = newNode;
			}
			// nodeValue = nodeValue.right;
			this.insert(value, (nodeValue = nodeValue.right));
		}
	}

	minValue(root) {
		let minV = root.data;
		while (root.left != null) {
			minV = root.left.data;
			root = root.left;
		}
		return minV;
	}

	delete(value, root = this.root) {
	
		//Base Case
		if (root == null) {
			return root;
		}

		//Otherwise recursivley go down the tree.
		if (value < root.data) {
			root.left = this.delete(value, root.left);
		} else if (value > root.data) {
			root.right = this.delete(value, root.right);
		}
		//If it is not less or greater it is equal soo...
		//Since the value is the same as root, Then this node will be deleted.
		else
		{	
			//Node with only one child or no children.
			if (root.left == null) {
				return root.right;
			} else if (root.right == null){
				return root.left;
			}
			//Node with two children: Get the inorder successor (Next biggest number in the right sub tree, AKA The smallest in the right subtree.)
				root.data = this.minValue(root.right);
			//This deletes the inorder successor
				root.right = this.delete(root.data, root.right);
		
		}

		return root;
	}
}

function mergeSort(array) {
	if (array.length < 2) {
		return array;
	}
	let arrayHalf = Math.round(array.length / 2);
	let splicedArray = array.splice(0, arrayHalf);
	let leftSide = mergeSort(splicedArray);
	let rightSide = mergeSort(array);

	return mergeArrays(leftSide, rightSide);
}

function mergeArrays(left, right) {
	let sortedArray = [];
	while (true) {
		if (left[0] < right[0]) {
			sortedArray.push(left.shift());
		} else if (left[0] > right[0]) {
			sortedArray.push(right.shift());
		} else if (left[0] == right[0]) {
			sortedArray.push(left.shift());
			sortedArray.push(right.shift());
		}

		if (left.length == 0) {
			sortedArray.push(...right);
			break;
		} else if (right.length == 0) {
			sortedArray.push(...left);
			break;
		}
	}
	return sortedArray;
}
//Code from TOP to print out the binary search tree.
const prettyPrint = (node, prefix = "", isLeft = true) => {
	if (node.right !== null) {
		prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
	}
	console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
	if (node.left !== null) {
		prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
	}
};

//Testing
// let sortedBB = mergeSort([3, 1, 4, 9, 0, 5, 9, 5, 6, 1, 1, 1, 0, 0, 6]);
// console.log(sortedBB);

let arrOne = [4, 1, 6, 5, 7, 8, 2, 3, 10, 12];

const treeOne = new Tree(arrOne);
treeOne.delete(8);
// treeOne.delete(2);
// treeOne.delete(1);
prettyPrint(treeOne.root);

// console.log(treeOne.root);
//Testing