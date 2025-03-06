document.addEventListener('DOMContentLoaded', function() {
    // 自定义鼠标效果
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(function() {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 100);
    });
    
    document.addEventListener('mousedown', function() {
        cursor.style.transform = 'translate(-50%, -50%) scale(0.7)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(0.7)';
    });
    
    document.addEventListener('mouseup', function() {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
    });
    
    // 为所有链接和按钮添加鼠标悬停效果
    const links = document.querySelectorAll('a, button, .work-item, .gallery-item');
    links.forEach(link => {
        link.addEventListener('mouseenter', function() {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursor.style.backgroundColor = 'transparent';
            cursor.style.border = '1px solid var(--primary-color)';
            cursorFollower.style.width = '40px';
            cursorFollower.style.height = '40px';
        });
        
        link.addEventListener('mouseleave', function() {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.backgroundColor = 'var(--primary-color)';
            cursor.style.border = 'none';
            cursorFollower.style.width = '30px';
            cursorFollower.style.height = '30px';
        });
    });
    
    // 导航栏链接点击事件
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('.section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 移除所有导航链接的active类
            navLinks.forEach(navLink => {
                navLink.classList.remove('active');
            });
            
            // 为当前点击的链接添加active类
            this.classList.add('active');
            
            // 获取目标section的id
            const targetId = this.getAttribute('href').substring(1);
            
            // 隐藏所有section
            sections.forEach(section => {
                section.classList.remove('active');
            });
            
            // 显示目标section
            document.getElementById(targetId).classList.add('active');
            
            // 平滑滚动到顶部
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });
    
    // 页脚链接点击事件
    const footerLinks = document.querySelectorAll('.footer-links a');
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            
            // 更新导航栏active状态
            navLinks.forEach(navLink => {
                navLink.classList.remove('active');
                if(navLink.getAttribute('href') === '#' + targetId) {
                    navLink.classList.add('active');
                }
            });
            
            // 隐藏所有section
            sections.forEach(section => {
                section.classList.remove('active');
            });
            
            // 显示目标section
            document.getElementById(targetId).classList.add('active');
            
            // 平滑滚动到顶部
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });
    
    // 作品集筛选功能
    const filterBtns = document.querySelectorAll('.filter-btn');
    const workItems = document.querySelectorAll('.work-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // 移除所有筛选按钮的active类
            filterBtns.forEach(filterBtn => {
                filterBtn.classList.remove('active');
            });
            
            // 为当前点击的按钮添加active类
            this.classList.add('active');
            
            // 获取筛选类别
            const filterValue = this.getAttribute('data-filter');
            
            // 筛选作品项
            workItems.forEach(item => {
                if(filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // 图库项点击事件（简单的灯箱效果）
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').getAttribute('src');
            
            // 创建灯箱元素
            const lightbox = document.createElement('div');
            lightbox.classList.add('lightbox');
            
            const lightboxContent = document.createElement('div');
            lightboxContent.classList.add('lightbox-content');
            
            const lightboxImg = document.createElement('img');
            lightboxImg.setAttribute('src', imgSrc);
            
            const closeBtn = document.createElement('span');
            closeBtn.classList.add('lightbox-close');
            closeBtn.innerHTML = '&times;';
            
            lightboxContent.appendChild(lightboxImg);
            lightboxContent.appendChild(closeBtn);
            lightbox.appendChild(lightboxContent);
            document.body.appendChild(lightbox);
            
            // 添加灯箱样式
            lightbox.style.position = 'fixed';
            lightbox.style.top = '0';
            lightbox.style.left = '0';
            lightbox.style.width = '100%';
            lightbox.style.height = '100%';
            lightbox.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
            lightbox.style.display = 'flex';
            lightbox.style.justifyContent = 'center';
            lightbox.style.alignItems = 'center';
            lightbox.style.zIndex = '1000';
            lightbox.style.opacity = '0';
            lightbox.style.transition = 'opacity 0.3s ease';
            
            lightboxContent.style.position = 'relative';
            lightboxContent.style.maxWidth = '90%';
            lightboxContent.style.maxHeight = '90%';
            
            lightboxImg.style.maxWidth = '100%';
            lightboxImg.style.maxHeight = '90vh';
            lightboxImg.style.borderRadius = '8px';
            lightboxImg.style.boxShadow = '0 0 30px rgba(0, 0, 0, 0.5)';
            
            closeBtn.style.position = 'absolute';
            closeBtn.style.top = '-40px';
            closeBtn.style.right = '0';
            closeBtn.style.color = '#fff';
            closeBtn.style.fontSize = '40px';
            closeBtn.style.cursor = 'pointer';
            closeBtn.style.transition = 'color 0.3s ease';
            
            // 显示灯箱
            setTimeout(() => {
                lightbox.style.opacity = '1';
            }, 10);
            
            // 关闭灯箱
            closeBtn.addEventListener('click', function() {
                lightbox.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(lightbox);
                }, 300);
            });
            
            // 点击灯箱背景关闭
            lightbox.addEventListener('click', function(e) {
                if(e.target === lightbox) {
                    lightbox.style.opacity = '0';
                    setTimeout(() => {
                        document.body.removeChild(lightbox);
                    }, 300);
                }
            });
        });
    });
    
    // 技能进度条动画
    const skillBars = document.querySelectorAll('.skill-progress');
    
    // 检查元素是否在视口中
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // 初始化技能进度条宽度为0
    skillBars.forEach(bar => {
        bar.style.width = '0';
    });
    
    // 监听滚动事件，当技能条进入视口时触发动画
    function animateSkills() {
        skillBars.forEach(bar => {
            if(isInViewport(bar) && bar.style.width === '0px') {
                const targetWidth = bar.getAttribute('style').split('width:')[1].split('%')[0].trim();
                bar.style.width = targetWidth + '%';
            }
        });
    }
    
    // 初始检查
    animateSkills();
    
    // 滚动时检查
    window.addEventListener('scroll', animateSkills);
    
    // 联系表单提交事件
    const contactForm = document.querySelector('.contact-form form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 获取表单数据
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const subject = this.querySelector('input[placeholder="主题"]').value;
        const message = this.querySelector('textarea').value;
        
        // 简单验证
        if(!name || !email || !message) {
            alert('请填写必填字段！');
            return;
        }
        
        // 这里可以添加发送表单数据的代码
        // 为了演示，我们只显示一个成功消息
        
        // 创建成功消息元素
        const successMessage = document.createElement('div');
        successMessage.classList.add('success-message');
        successMessage.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <h3>消息已发送！</h3>
            <p>感谢您的留言，我会尽快回复您。</p>
        `;
        
        // 添加样式
        successMessage.style.backgroundColor = '#e6f7e6';
        successMessage.style.color = '#2e7d32';
        successMessage.style.padding = '20px';
        successMessage.style.borderRadius = '8px';
        successMessage.style.textAlign = 'center';
        successMessage.style.marginTop = '20px';
        
        // 隐藏表单并显示成功消息
        contactForm.style.display = 'none';
        contactForm.parentNode.appendChild(successMessage);
        
        // 5秒后恢复表单
        setTimeout(() => {
            contactForm.reset();
            contactForm.style.display = 'block';
            contactForm.parentNode.removeChild(successMessage);
        }, 5000);
    });
    
    // 初始化显示首页
    document.getElementById('home').classList.add('active');
    document.querySelector('nav a[href="#home"]').classList.add('active');
    
    // 添加页面加载动画
    const loadingScreen = document.createElement('div');
    loadingScreen.classList.add('loading-screen');
    loadingScreen.innerHTML = `
        <div class="loading-animation">
            <div class="loading-circle"></div>
            <div class="loading-text">Loading...</div>
        </div>
    `;
    
    // 添加样式
    loadingScreen.style.position = 'fixed';
    loadingScreen.style.top = '0';
    loadingScreen.style.left = '0';
    loadingScreen.style.width = '100%';
    loadingScreen.style.height = '100%';
    loadingScreen.style.backgroundColor = '#fff';
    loadingScreen.style.display = 'flex';
    loadingScreen.style.justifyContent = 'center';
    loadingScreen.style.alignItems = 'center';
    loadingScreen.style.zIndex = '9999';
    loadingScreen.style.transition = 'opacity 0.5s ease';
    
    const loadingAnimation = loadingScreen.querySelector('.loading-animation');
    loadingAnimation.style.display = 'flex';
    loadingAnimation.style.flexDirection = 'column';
    loadingAnimation.style.alignItems = 'center';
    
    const loadingCircle = loadingScreen.querySelector('.loading-circle');
    loadingCircle.style.width = '50px';
    loadingCircle.style.height = '50px';
    loadingCircle.style.border = '5px solid #f3f3f3';
    loadingCircle.style.borderTop = '5px solid var(--primary-color)';
    loadingCircle.style.borderRadius = '50%';
    loadingCircle.style.animation = 'spin 1s linear infinite';
    
    const loadingText = loadingScreen.querySelector('.loading-text');
    loadingText.style.marginTop = '20px';
    loadingText.style.color = 'var(--primary-color)';
    loadingText.style.fontWeight = 'bold';
    
    // 添加旋转动画
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    // 添加到页面
    document.body.appendChild(loadingScreen);
    
    // 页面加载完成后移除加载动画
    window.addEventListener('load', function() {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(loadingScreen);
            }, 500);
        }, 1000);
    });
}); 