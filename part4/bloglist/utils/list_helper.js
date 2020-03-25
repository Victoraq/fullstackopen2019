const lodash = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }

    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    const findGreatest = (acc, item) => {
        return acc.likes > item.likes ? acc : item
    }

    favorite = blogs.reduce(findGreatest,1)

    return {
        title: favorite.title,
        author: favorite.author,
        likes: favorite.likes
    }

}

const mostBlogs = (blogs) => {

    if (blogs.length === 0) {
        return {}
    }

    // count occurence of each author
    countAuthors = lodash.countBy(blogs, 'author')
    // transform the dictionary into list of lists
    entries = lodash.entries(countAuthors)
    // take the max by the count
    mostBlogsAuthor = lodash.maxBy(entries, (item) => item[1])
    
    return {
        'author': mostBlogsAuthor[0],
        'blogs': mostBlogsAuthor[1]
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}