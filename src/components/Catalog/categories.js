const categories = [
	{
		title: 'Сельскохозяйственная техника',
		subtitle: 'Техники (234)',
		image: 'new-tractor-white-background.png',
		imageSize: {
			lg: {
				width: 166,
				height: 140,
			},
			md: {
				width: 148,
				height: 124,
			},
			sm: {
				width: 90,
				height: 75,
			}
		},
		position: {
			lg: { right: 19, bottom: 26, rotate: '0deg' },
			md: { right: 11, bottom: 14, rotate: '0deg' },
			sm: { right: 7, bottom: 9, rotate: '0deg' }
		}
	},
	{
		title: 'Продукция',
		subtitle: 'Техники (234)',
		image: 'image-7.png',
		imageSize: {
			lg: {
				width: 171,
				height: 95,
			},
			md: {
				width: 147,
				height: 82,
			},
			sm: {
				width: 89,
				height: 50,
			}
		},
		position: {
			lg: { right: 20, bottom: 34, rotate: '0deg' },
			md: { right: 19, bottom: 19, rotate: '0deg' },
			sm: { right: 12, bottom: 12, rotate: '0deg' }
		}
	},
	{
		title: 'Семена, посадочный материал',
		subtitle: 'Техники (234)',
		image: 'hemp-seeds.png',
		imageSize: {
			lg: {
				width: 162,
				height: 162,
			},
			md: {
				width: 116,
				height: 116,
			},
			sm: {
				width: 70,
				height: 71,
			}
		},
		position: {
			lg: { right: 14, bottom: 12, rotate: '0deg' },
			md: { right: 16, bottom: 11, rotate: '0deg' },
			sm: { right: 10, bottom: 7, rotate: '0deg' }
		}
	},
	{
		title: 'Пестициды',
		subtitle: 'Техники (234)',
		image: 'pressure-garden-pump.png',
		imageSize: {
			lg: {
				width: 124,
				height: 186,
			},
			md: {
				width: 99.91,
				height: 149.87,
			},
			sm: {
				width: 60.6,
				height: 90.89,
			}
		},
		position: {
			lg: { right: 14.6, bottom: 0.77, rotate: '-2.12deg'},
			md: { right: 7.61, bottom: 2.54, rotate: '-2.12deg' },
			sm: { right: 2.08, bottom: 1.38, rotate: '-2.12deg' }
		}
	},
	{
		title: 'Оборудование',
		subtitle: 'Техники (234)',
		image: '3d-render-rotavator.png',
		imageSize: {
			lg: {
				width: 187,
				height: 141,
			},
			md: {
				width: 152,
				height: 114,
			},
			sm: {
				width: 93,
				height: 70,
			}
		},
		position: {
			lg: { right: 9, bottom: 21, rotate: '0deg' },
			md: { right: 4, bottom: 18, rotate: '0deg' },
			sm: { right: 2, bottom: 10, rotate: '0deg' }
		}
	},
	{
		title: 'Услуги',
		subtitle: 'Техники (234)',
		image: 'yellow-modern-harvester-white-background-3d-illustration.png',
		imageSize: {
			lg: {
				width: 213,
				height: 164,
			},
			md: {
				width: 145,
				height: 112,
			},
			sm: {
				width: 88,
				height: 68,
			}
		},
		position: {
			lg: { right: 1, bottom: 8, rotate: '0deg' },
			md: { right: 0, bottom: 6, rotate: '0deg' },
			sm: { right: 0, bottom: 4, rotate: '0deg' }
		}
	},
	{
		title: 'Сельскохозяйственные животные и птицы',
		subtitle: 'Техники (234)',
		image: 'brown-hybrid-hen-isolated-white.png',
		imageSize: {
			lg: {
				width: 237,
				height: 158,
			},
			md: {
				width: 164,
				height: 110,
			},
			sm: {
				width: 100,
				height: 66,
			}
		},
		position: {
			lg: { right: 6, bottom: 3, rotate: '0deg' },
			md: { right: 11, bottom: 18, rotate: '0deg' },
			sm: { right: 7, bottom: 5, rotate: '0deg' }
		}
	},
	{
		title: 'Корма для животных и птиц',
		subtitle: 'Техники (234)',
		image: 'forage-livestock-3-bags-large-medium-small-granules-view-2-isolate.png',
		imageSize: {
			lg: {
				width: 229,
				height: 187,
			},
			md: {
				width: 145,
				height: 118,
			},
			sm: {
				width: 88,
				height: 71,
			}
		},
		position: {
			lg: { right: -22, bottom: -10, rotate: '0deg' },
			md: { right: 5, bottom: 1, rotate: '0deg' },
			sm: { right: 3, bottom: 1, rotate: '0deg' }
		}
	},
	{
		title: 'Оборудование',
		subtitle: 'Техники (234)',
		image: '3d-render-rotavator.png',
		imageSize: {
			lg: {
				width: 187,
				height: 141,
			},
			md: {
				width: 152,
				height: 114,
			},
			sm: {
				width: 93,
				height: 70,
			}
		},
		position: {
			lg: { right: 9, bottom: 21, rotate: '0deg' },
			md: { right: 4, bottom: 18, rotate: '0deg' },
			sm: { right: 2, bottom: 10, rotate: '0deg' }
		}
	},
	{
		title: 'Удобрения',
		subtitle: 'Техники (234)',
		image: 'young-plant-isolated-white.png',
		imageSize: {
			lg: {
				width: 168,
				height: 161,
			},
			md: {
				width: 136,
				height: 131,
			},
			sm: {
				width: 82,
				height: 79,
			}
		},
		position: {
			lg: { right: 6, bottom: 11, rotate: '0deg' },
			md: { right: 3, bottom: 15, rotate: '0deg' },
			sm: { right: 3, bottom: 10, rotate: '0deg' }
		}
	},
	{
		title: 'Сельскохозяйственные земли и объекты',
		subtitle: 'Техники (234)',
		image: 'abstract-green-grass-texture-circle-green-grass-isolated.png',
		imageSize: {
			lg: {
				width: 184,
				height: 118,
			},
			md: {
				width: 148,
				height: 95,
			},
			sm: {
				width: 90,
				height: 58,
			}
		},
		position: {
			lg: { right: 7, bottom: 5, rotate: '0deg' },
			md: { right: 19, bottom: 12, rotate: '0deg' },
			sm: { right: 12, bottom: 8, rotate: '0deg' }
		}
	},
	{
		title: 'Прочие',
		subtitle: 'Техники (234)',
		image: 'image-6.png',
		imageSize: {
			lg: {
				width: 155,
				height: 127,
			},
			md: {
				width: 117,
				height: 97,
			},
			sm: {
				width: 72,
				height: 59,
			}
		},
		position: {
			lg: { right: 21, bottom: 9, rotate: '0deg' },
			md: { right: 12, bottom: 17, rotate: '0deg' },
			sm: { right: 7, bottom: 11, rotate: '0deg' }
		}
	}
]

export default categories
